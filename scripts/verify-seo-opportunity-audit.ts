import assert from "node:assert/strict";
import {
  analyzeOpportunities,
  parseGscCsv,
  routeRelevance,
  type AuditDataset,
} from "./lib/seo-opportunity.js";

const csv = 'page,query,clicks,impressions,ctr,position\n"https://www.gestionvelora.com/blog/a","query, quoted",2,20,0.1,6\n';
const parsed = parseGscCsv(csv);
assert.equal(parsed.length, 1);
assert.equal(parsed[0].query, "query, quoted");
assert.equal(parsed[0].impressions, 20);

assert.equal(routeRelevance("gestion copropriété Montréal", "https://www.gestionvelora.com/services/gestion-copropriete-montreal"), 1);
assert.equal(routeRelevance("rendement plex Montréal", "https://www.gestionvelora.com/blog/article-general"), 0);

const pageA = "https://www.gestionvelora.com/services/gestion-copropriete-montreal";
const pageB = "https://www.gestionvelora.com/blog/gestion-copropriete";
const pageC = "https://www.gestionvelora.com/blog/article-general";

const current: AuditDataset = {
  pages: [
    { page: pageA, clicks: 10, impressions: 200, ctr: 0.05, position: 6 },
    { page: pageB, clicks: 2, impressions: 80, ctr: 0.025, position: 9 },
    { page: pageC, clicks: 1, impressions: 120, ctr: 1 / 120, position: 12 },
  ],
  queries: [
    { query: "gestion copropriete montreal", clicks: 10, impressions: 200, ctr: 0.05, position: 6 },
    { query: "rendement plex montreal", clicks: 1, impressions: 120, ctr: 1 / 120, position: 12 },
    { query: "gestion immobiliere", clicks: 5, impressions: 100, ctr: 0.05, position: 4 },
  ],
  pageQueries: [
    { page: pageA, query: "gestion copropriete montreal", clicks: 8, impressions: 160, ctr: 0.05, position: 6 },
    { page: pageB, query: "gestion copropriete montreal", clicks: 2, impressions: 40, ctr: 0.05, position: 8 },
    { page: pageC, query: "rendement plex montreal", clicks: 1, impressions: 120, ctr: 1 / 120, position: 12 },
  ],
};

const previous: AuditDataset = {
  pages: [
    { page: pageA, clicks: 20, impressions: 200, ctr: 0.1, position: 5 },
    { page: pageB, clicks: 1, impressions: 60, ctr: 1 / 60, position: 10 },
    { page: pageC, clicks: 0, impressions: 80, ctr: 0, position: 18 },
  ],
  queries: [
    { query: "gestion copropriete montreal", clicks: 20, impressions: 200, ctr: 0.1, position: 5 },
    { query: "rendement plex montreal", clicks: 0, impressions: 80, ctr: 0, position: 18 },
    { query: "gestion immobiliere", clicks: 5, impressions: 100, ctr: 0.05, position: 4 },
  ],
  pageQueries: [],
};

const audit = analyzeOpportunities(current, previous);
const cannibalized = audit.queryOpportunities.find((row) => row.query === "gestion copropriete montreal");
assert.ok(cannibalized);
assert.equal(cannibalized.cannibalized, true);
assert.equal(cannibalized.action, "consolidate_or_clarify_ownership");
assert.equal(cannibalized.competingPages.length, 2);

const topicGap = audit.queryOpportunities.find((row) => row.query === "rendement plex montreal");
assert.ok(topicGap);
assert.equal(topicGap.nearMiss, true);
assert.equal(topicGap.clearOwner, false);
assert.equal(topicGap.action, "review_topic_gap");
assert.equal(audit.summary.topicGapsToReview, 1);
assert.equal(audit.summary.cannibalizedQueries, 1);

const brandedCurrent: AuditDataset = {
  pages: [{ page: "https://www.gestionvelora.com/", clicks: 1, impressions: 20, ctr: 0.05, position: 8 }],
  queries: [{ query: "gestion velora", clicks: 1, impressions: 20, ctr: 0.05, position: 8 }],
  pageQueries: [{ page: "https://www.gestionvelora.com/", query: "gestion velora", clicks: 1, impressions: 20, ctr: 0.05, position: 8 }],
};
const brandedAudit = analyzeOpportunities(brandedCurrent, { pages: [], queries: [], pageQueries: [] });
assert.equal(brandedAudit.summary.topicGapsToReview, 0);
assert.equal(brandedAudit.queryOpportunities.some((row) => row.action === "review_topic_gap"), false);

const typoBrandCurrent: AuditDataset = {
  pages: [{ page: "https://www.gestionvelora.com/", clicks: 5, impressions: 20, ctr: 0.25, position: 6 }],
  queries: [{ query: "valora", clicks: 5, impressions: 20, ctr: 0.25, position: 6 }],
  pageQueries: [{ page: "https://www.gestionvelora.com/", query: "valora", clicks: 5, impressions: 20, ctr: 0.25, position: 6 }],
};
const typoBrandAudit = analyzeOpportunities(typoBrandCurrent, { pages: [], queries: [], pageQueries: [] });
assert.equal(typoBrandAudit.summary.topicGapsToReview, 0);

const strongAggregateDespiteSplit: AuditDataset = {
  pages: [
    { page: "https://www.gestionvelora.com/", clicks: 15, impressions: 20, ctr: 0.75, position: 1.1 },
    { page: "https://www.gestionvelora.com/about", clicks: 0, impressions: 12, ctr: 0, position: 10 },
  ],
  queries: [{ query: "gestion valora", clicks: 15, impressions: 20, ctr: 0.75, position: 1.1 }],
  pageQueries: [
    { page: "https://www.gestionvelora.com/", query: "gestion valora", clicks: 15, impressions: 12, ctr: 1, position: 1 },
    { page: "https://www.gestionvelora.com/about", query: "gestion valora", clicks: 0, impressions: 12, ctr: 0, position: 10 },
  ],
};
const strongAggregateAudit = analyzeOpportunities(
  strongAggregateDespiteSplit,
  { pages: [], queries: [], pageQueries: [] },
);
assert.equal(strongAggregateAudit.summary.cannibalizedQueries, 0);
assert.equal(
  strongAggregateAudit.queryOpportunities.some((row) => row.query === "gestion valora" && row.cannibalized),
  false,
);

const pageRegression = audit.pageOpportunities.find((row) => row.page === pageA);
assert.ok(pageRegression);
assert.equal(pageRegression.lostClicks, 10);
assert.ok(audit.pageOpportunities.every((row, index, rows) => index === 0 || rows[index - 1].score >= row.score));

console.log("SEO opportunity audit invariants passed.");
