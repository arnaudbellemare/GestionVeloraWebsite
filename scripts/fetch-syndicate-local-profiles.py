"""Compute MunicipalProfile rows for src/data/syndicateLocalProfiles.ts.

Source: Statistics Canada WDS API, table 98-10-0233-01 (2021 Census, private
households by period of construction, structural type, dwelling condition and
tenure). No key needed. Reads only public data and writes JSON to stdout.

Usage: python3 scripts/fetch-syndicate-local-profiles.py saint-lambert=1659 ...
The number after each slug is the table's geography member ID (not the CSD
code): find it with getCubeMetadata (productId 98100233), dimension 1, where
classificationCode is the CSD code. Two "Saint-Lambert" CSDs exist; use 2458012.
Check: saint-lambert=1659 must reproduce the committed row exactly.
"""
import json, sys, urllib.request

PID = 98100233
GEOS = dict(arg.split("=") for arg in sys.argv[1:])  # slug=memberId

def coord(g, period=1, typ=1, cond=1, tenure=1):
    return f"{g}.{period}.{typ}.1.{cond}.{tenure}.0.0.0.0"

def fetch(coords):
    out = {}
    for i in range(0, len(coords), 100):
        body = json.dumps([{"productId": PID, "coordinate": c, "latestN": 1} for c in coords[i:i+100]]).encode()
        req = urllib.request.Request("https://www150.statcan.gc.ca/t1/wds/rest/getDataFromCubePidCoordAndLatestNPeriods",
                                     data=body, headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0 (compatible; data-fetch/1.0)"})
        for item in json.load(urllib.request.urlopen(req, timeout=60)):
            obj = item.get("object") or {}
            pts = obj.get("vectorDataPoint") or []
            # Results arrive out of order: key on the returned coordinate.
            out[obj.get("coordinate")] = pts[0]["value"] if pts and pts[0].get("value") is not None else None
    return out

def r1(x):  # JS Math.round semantics on one decimal
    import math
    return math.floor(x * 10 + 0.5) / 10

rows = {}
for slug, g in GEOS.items():
    cs = {coord(g)}
    cs.add(coord(g, tenure=2)); cs.add(coord(g, cond=4))
    cs |= {coord(g, period=p) for p in range(2, 14)}
    cs |= {coord(g, typ=t) for t in (2, 3, 6)}
    cs |= {coord(g, period=p, typ=3) for p in range(10, 14)}
    v = fetch(sorted(cs))
    tot = v[coord(g)]
    share = lambda n: r1(100 * n / tot)
    per = lambda ps: sum(v[coord(g, period=p)] or 0 for p in ps)
    apt5 = v.get(coord(g, typ=3))
    apt5_new = sum(v.get(coord(g, period=p, typ=3)) or 0 for p in range(10, 14))
    rows[slug] = {
        "households": int(tot),
        "owner": share(v[coord(g, tenure=2)]),
        "pre1981": share(per(range(2, 7))),
        "built1981to2000": share(per(range(7, 10))),
        "post2001": share(per(range(10, 14))),
        "apt5plus": share(apt5) if apt5 else None,
        "apt5plusHouseholds": int(apt5) if apt5 else None,
        "apt5plusBuiltSince2001": r1(100 * apt5_new / apt5) if apt5 and apt5 >= 1000 else None,
        "aptUnder5": share(v[coord(g, typ=6)]),
        "singleDetached": share(v[coord(g, typ=2)]),
        "majorRepairs": share(v[coord(g, cond=4)]),
    }
print(json.dumps(rows, indent=1, ensure_ascii=False))
