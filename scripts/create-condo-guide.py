"""Generate the illustrated French condominium guide (requires reportlab and Pillow)."""
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.lib.colors import HexColor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/guides/guide-technique-copropriete.pdf'
PHOTO = ROOT / 'public/guides/copropriete-montreal.jpg'
MEETING = ROOT / 'public/guides/planification-copropriete.jpg'
pdfmetrics.registerFont(TTFont('Guide', str(ROOT / 'public/guides/fonts/Geist-Regular.ttf')))
pdfmetrics.registerFont(TTFont('GuideBold', str(ROOT / 'public/guides/fonts/Geist-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('GuideDisplay', str(ROOT / 'public/guides/fonts/GeistSerif-Regular.ttf')))
c = canvas.Canvas(str(OUT), pagesize=(612,792))
c.setTitle('Guide technique de la gestion de copropriété | Gestion Velora')
ink=HexColor('#202821'); orange=HexColor('#a65313'); paper=HexColor('#f8f6ef'); muted=HexColor('#59645b'); line=HexColor('#d9ded5'); pale=HexColor('#e9eee8'); white=HexColor('#ffffff')
def rect(x,y,w,h,fill,stroke=None,r=0):
 c.setFillColor(fill); c.setStrokeColor(stroke or fill); c.roundRect(x,y,w,h,r,fill=1,stroke=int(bool(stroke)))
def text(x,y,s,size=10,font='Guide',color=ink):
 c.setFillColor(color); c.setFont(font,size); c.drawString(x,y,s)
def centered_text(x, y, s, size=10, font='Guide', color=ink):
 c.setFillColor(color); c.setFont(font, size)
 ascent, descent = pdfmetrics.getAscentDescent(font, size)
 c.drawCentredString(x, y - (ascent + descent) / 2, s)
def wrap(s,x,y,width=480,size=10,leading=15,color=ink,font='Guide'):
 for l in simpleSplit(s,font,size,width):
  text(x,y,l,size,font,color); y-=leading
 return y
def lines(items,x,y,width=480):
 for item in items:
  c.setStrokeColor(orange); c.roundRect(x,y-1,9,9,1,stroke=1,fill=0)
  y=wrap(item,x+19,y,width-19,10,15)-13
 return y
def callout(top, body, fill=HexColor('#f1e4cf')):
 padding = 14
 line_height = 15
 wrapped = simpleSplit(body, 'Guide', 10, 500)
 height = len(wrapped) * line_height + 2 * padding - 3
 rect(42, top - height, 528, height, fill, r=7)
 for index, item in enumerate(wrapped):
  text(56, top - padding - 9 - index * line_height, item, 10)
 return top - height

def imgbox(x,y,w,h):
 c.saveState(); path=c.beginPath(); path.roundRect(x,y,w,h,7); c.clipPath(path,stroke=0); c.drawImage(ImageReader(str(PHOTO)),x,y,w,h,preserveAspectRatio=False,mask='auto'); c.restoreState()
def footer(n):
 c.setStrokeColor(line); c.line(42,46,570,46)
 text(42,30,'GESTION VELORA  /  GUIDE COPROPRIÉTÉ',7,'GuideBold',muted); text(547,30,f'{n:02}',8,'GuideBold',muted)
def base(n,kicker,title,subtitle):
 rect(0,0,612,792,paper); text(42,752,'GESTION VELORA',9,'GuideBold'); text(42,709,kicker.upper(),9,'GuideBold',orange)
 text(42,674,title,29,'GuideDisplay'); wrap(subtitle,42,650,510,10,15,muted); footer(n)
def label(x,y,number,title,body,width=152):
 text(x,y,number,10,'GuideBold',orange); text(x,y-25,title,12,'GuideBold'); wrap(body,x,y-46,width,9,14,muted)
def section(x,y,title,body,width=486):
 text(x,y,title,13,'GuideBold'); return wrap(body,x,y-22,width,10,15)-14
# COVER
rect(0,0,612,792,paper); text(42,748,'GESTION VELORA',10,'GuideBold'); text(442,748,'GUIDE PRATIQUE  /  2026',8,'GuideBold',muted)
imgbox(42,363,528,350)
badge_width = pdfmetrics.stringWidth('RESSOURCE GRATUITE', 'GuideBold', 8) + 32
rect(42,333,badge_width,24,orange,r=12); centered_text(42 + badge_width / 2,345,'RESSOURCE GRATUITE',8,'GuideBold',white)
text(42,284,'Guide technique de la',31,'GuideDisplay'); text(42,249,'gestion de copropriété',31,'GuideDisplay')
wrap('Un cadre clair pour entretenir votre immeuble, respecter vos obligations et comprendre comment un gestionnaire peut soutenir votre conseil.',42,211,440,11,17,muted)
text(42,80,'POUR LES CONSEILS D’ADMINISTRATION AU QUÉBEC',8,'GuideBold'); footer(1); c.showPage()
# ORIENTATION
base(2,'Bien commencer','Une copropriété bien suivie','Un bon système transforme les urgences répétées en décisions mieux préparées.')
rect(42,446,528,145,pale,r=8)
label(62,564,'01','Connaître','Rassembler les documents et dresser le portrait des composantes.')
label(237,564,'02','Planifier','Relier entretien, travaux majeurs et financement.')
label(412,564,'03','Agir','Décider, attribuer un responsable et garder des traces.',138)
text(42,406,'Votre point de départ',16,'GuideBold')
y=lines(['Rassembler déclaration, plans, contrats, garanties et rapports disponibles.','Identifier les problèmes urgents et les personnes responsables.','Vérifier l’état du carnet d’entretien et de l’étude du fonds de prévoyance.','Prévoir une rencontre du conseil pour classer les prochaines actions.'],42,376,520)
callout(y-8,'Ce guide est informatif. La déclaration de copropriété et les avis des professionnels adaptés à votre immeuble demeurent essentiels.')
c.showPage()
# INVENTORY
base(3,'01 / connaître','Faire le portrait de l’immeuble','Une liste claire des composantes aide à repérer les risques et à préparer les bons mandats.')
text(42,587,'Les composantes à examiner',16,'GuideBold')
cards=[('01','Enveloppe','Toiture, façades, fenêtres et étanchéité.'),('02','Structure','Fondations, balcons et éléments porteurs.'),('03','Systèmes','Plomberie, chauffage, ventilation et électricité.'),('04','Espaces communs','Stationnement, couloirs et aménagements extérieurs.')]
for i,(num,title,body) in enumerate(cards):
 x=42+(i%2)*270; y=446-(i//2)*120
 rect(x,y,258,108,white,line,7); text(x+16,y+79,num,9,'GuideBold',orange); text(x+16,y+56,title,12,'GuideBold'); wrap(body,x+16,y+37,224,9,13,muted)
text(42,275,'Pour chaque élément, consignez',14,'GuideBold')
y=lines(['Emplacement, âge approximatif et état observé.','Historique des inspections, entretien, garanties et interventions.','Prochaine action, responsable et échéance.'],42,248,520)
wrap('Les parties communes et privatives varient selon la déclaration. Une infiltration active ou un risque pour la sécurité demande une attention rapide.',42,y-8,515,9,14,muted)
c.showPage()
# PLANNING
base(4,'02 / planifier','Du carnet au financement','Deux outils complémentaires pour entretenir le bâtiment et anticiper les dépenses.')
rect(42,439,253,150,white,line,7); rect(307,439,263,150,white,line,7)
text(58,562,'01  CARNET D’ENTRETIEN',9,'GuideBold',orange); wrap('Qu’avons-nous et quand intervenir?',58,536,218,15,19,ink,'GuideBold')
wrap('Inventaire des parties communes, entretien et planification des travaux à effectuer.',58,487,220,10,15,muted)
text(323,562,'02  ÉTUDE DU FONDS',9,'GuideBold',orange); wrap('Combien prévoir pour les travaux?',323,536,220,15,19,ink,'GuideBold')
wrap('Prévisions financières et recommandations de soldes et de contributions.',323,487,220,10,15,muted)
y=405
y=section(42,y,'Ce que le conseil doit savoir','Le carnet doit être tenu à jour. L’étude s’appuie notamment sur les travaux prévus sur au moins 25 ans et doit être obtenue au moins tous les cinq ans. Les documents sont établis par des personnes habilitées.')
y=section(42,y,'Une échéance à vérifier','Le règlement est entré en vigueur le 14 août 2025. En général, les syndicats ont jusqu’au 15 août 2028 pour obtenir les premiers documents. Des règles particulières s’appliquent notamment aux nouvelles copropriétés.')
callout(y-8,'À faire : vérifiez votre situation et demandez une proposition écrite à une personne habilitée.')
c.showPage()
# ACTION PLAN
base(5,'03 / agir','Préparer les travaux majeurs','Décidez avec une portée claire, des options comparables et un suivi documenté.')
steps=[('01','Définir','Quel problème faut-il résoudre? Demandez une évaluation si la cause ou la portée est incertaine.'),('02','Comparer','Obtenez des soumissions sur une même portée. Vérifiez qualifications, assurances, exclusions et échéances.'),('03','Financer','Examinez le budget, le fonds concerné, les imprévus et les autorisations nécessaires.'),('04','Suivre','Confirmez le responsable, les étapes, la surveillance, la réception et les garanties.')]
for i,(num,title,body) in enumerate(steps):
 y=566-i*103
 rect(42,y-73,528,88,white,line,7)
 c.setFillColor(orange); c.circle(78,y-29,17,fill=1,stroke=0)
 centered_text(78,y-29,num,10,'GuideBold',white)
 text(112,y-9,title,13,'GuideBold'); wrap(body,112,y-30,430,10,15,muted)
wrap('Conservez les décisions, contrats, photos, factures et rapports, puis mettez à jour le carnet après l’intervention.',42,150,520,10,15,muted)
c.showPage()
# ROUTINE
base(6,'04 / suivre','La routine du conseil','Un rendez-vous régulier avec les bons documents fait toute la différence.')
for y,title,body in [(554,'Chaque mois','Suivre les incidents, demandes, dépenses et actions en cours.'),(469,'Chaque saison','Planifier les inspections et l’entretien adaptés au bâtiment.'),(384,'Chaque année','Revoir budget, contrats et assurances; préparer l’assemblée.'),(299,'Après les travaux','Conserver les pièces, vérifier les correctifs et mettre le carnet à jour.')]:
 c.setFillColor(orange); c.circle(52,y+4,5,fill=1,stroke=0); text(72,y,title,13,'GuideBold'); wrap(body,72,y-23,470,10,15,muted)
 if y>299: c.setStrokeColor(line); c.line(52,y-16,52,y-65)
rect(42,187,528,62,pale,r=7); text(58,226,'Prochaine réunion',11,'GuideBold'); text(58,205,'Date : ____________________    Responsable : ____________________',10)
c.showPage()
# DELEGATION
base(7,'05 / se faire accompagner','Un gestionnaire : quel rôle?','Déléguer les suivis permet au conseil de se concentrer sur les décisions et les priorités.')
rect(42,460,254,128,white,line,7); rect(308,460,262,128,pale,r=7)
text(58,560,'LE GESTIONNAIRE',10,'GuideBold',orange)
wrap('Coordonne les tâches confiées, prépare les dossiers et suit les échéances et les fournisseurs.',58,537,220,10,15)
text(324,560,'LE CONSEIL',10,'GuideBold',orange)
wrap('Surveille la gestion, prend les décisions relevant de sa compétence et veille aux obligations du syndicat.',324,537,225,10,15)
y=428
y=section(42,y,'Ce que la loi permet','Le Code civil du Québec permet de confier l’administration courante du syndicat à un gérant. Il agit alors comme administrateur du bien d’autrui chargé de la simple administration (art. 1085).')
y=section(42,y,'Ce que le mandat doit préciser','Définissez par écrit les services, les limites d’autorisation et de dépenses, les approbations, les communications, les rapports et le traitement des urgences. Les décisions réservées au conseil ou à l’assemblée restent soumises aux règles applicables.')
y=section(42,y,'Le rôle des spécialistes','Le gestionnaire coordonne la collecte d’information et les mandats; il ne remplace pas la personne habilitée et indépendante qui doit établir ou réviser les documents réglementaires, ni les avis juridiques ou techniques nécessaires.')
callout(y-8,'Un gestionnaire aide à réduire les oublis et les retards; aucun service ne garantit l’absence de litige ou la conformité à lui seul.')
c.showPage()
# MANAGER IN PRACTICE
base(8,'06 / gagner du temps','Du suivi à la décision','Exemples de tâches qu’un gestionnaire peut prendre en charge selon le mandat convenu.')
manager_steps=[('DOCUMENTS','Centraliser plans, contrats, procès-verbaux et rapports; repérer les pièces manquantes et organiser le registre.'),('ENTRETIEN','Planifier les interventions récurrentes, coordonner les accès et fournisseurs, puis conserver les preuves de réalisation.'),('TRAVAUX ET BUDGET','Préparer les demandes de prix, comparer les offres, suivre les factures et présenter au conseil les choix à approuver.'),('GOUVERNANCE','Préparer les dossiers de réunion, suivre les décisions et faciliter les communications et la remise des documents.')]
for i,(title,body) in enumerate(manager_steps):
 y=574-i*98
 rect(42,y-72,528,85,white,line,7); text(58,y-10,title,10,'GuideBold',orange); wrap(body,58,y-31,490,10,15,ink)
callout(y-85,'Résultat recherché : moins de relances dispersées, des dossiers prêts pour les décisions et une meilleure continuité quand les administrateurs changent.',pale)
c.showPage()
# LEGAL MILESTONES
base(9,'07 / repères légaux','Les échéances à suivre','Un calendrier partagé permet de signaler les obligations à temps et de documenter les actions.')
legal=[('15 AOÛT 2028','Date générale pour obtenir le premier carnet et la première étude; vérifiez les règles particulières et votre situation.'),('60 JOURS','Après leur production, rendre ces documents disponibles aux copropriétaires dans les 60 jours, ou avant l’assemblée annuelle si elle a lieu plus tôt.'),('30 JOURS','Après l’assemblée annuelle suivant la première étude, le conseil établit les sommes à verser au fonds en suivant ses recommandations. Autre délai distinct : communiquer les procès-verbaux des décisions du conseil ou résolutions écrites dans les 30 jours.'),('15 JOURS','À la demande d’un vendeur, le syndicat remet l’attestation sur l’état de la copropriété dans les 15 jours.')]
y=579
for title,body in legal:
 text(42,y,title,11,'GuideBold',orange)
 y=wrap(body,159,y,405,10,15)-24
callout(y-8,'Le gestionnaire peut tenir le calendrier, préparer les pièces et alerter le conseil. Vérifiez les délais applicables avec les professionnels et la déclaration de votre copropriété.')
c.showPage()
# RESOURCES
base(10,'Ressources','Passez à l’action','Commencez par une priorité, une personne responsable et une date.')
rect(42,451,258,152,ink)
text(60,570,'VOTRE PROCHAINE ÉTAPE',8,'GuideBold',HexColor('#f2ad5a'))
wrap('Choisissez trois priorités et faites valider votre calendrier par les professionnels appropriés.',60,543,215,12,18,white,'GuideBold')
c.drawImage(ImageReader(str(MEETING)),300,451,270,152,mask='auto',preserveAspectRatio=True,anchor='c')
text(42,397,'Sources officielles',16,'GuideBold')
y=section(42,367,'Gouvernement du Québec','Mesures applicables aux copropriétés divises : carnet d’entretien, étude du fonds de prévoyance et échéances. Consulté en novembre 2026.')
url='https://www.quebec.ca/habitation-territoire/achat-vente/condos-coproprietes/mesures-coproprietes'
text(42,y,'Consulter les mesures sur quebec.ca  ↗'.replace('↗','>'),10,'GuideBold',orange); c.linkURL(url,(42,y-3,315,y+13),relative=0)
y-=43
y=section(42,y,'Guide explicatif des mesures','Règlement établissant diverses règles en matière de copropriété divise : publication de la Société d’habitation du Québec.')
url2='https://cdn-contenu.quebec.ca/cdn-contenu/adm/org/shq/Documents/publications/Guide-Explicatif-Mesures-Copropriete-Divise.pdf'
text(42,y,'Ouvrir le guide du gouvernement  >',10,'GuideBold',orange); c.linkURL(url2,(42,y-3,315,y+13),relative=0)
text(42,170,'Code civil du Québec : articles 1070, 1070.2, 1071, 1085 et 1086.1',9,'GuideBold',orange)
c.linkURL('https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991',(42,167,480,183),relative=0)
text(42,120,'Parlez-nous de votre immeuble',12,'GuideBold'); text(42,99,'info@gestionvelora.com  /  gestionvelora.com',10,'Guide',muted)
c.showPage(); c.save()
