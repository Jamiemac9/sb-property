export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  postcodeAreas: string[];
  nearby: string[];
  intro: string;
  localDetail: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "stafford",
    name: "Stafford",
    county: "Staffordshire",
    postcodeAreas: ["ST16", "ST17", "ST18"],
    nearby: ["Baswich", "Doxey", "Wildwood", "Littleworth"],
    intro: "Based in Stafford, our team provides house clearance, garden clearance, waste removal, cleaning and removals across the town and surrounding villages.",
    localDetail: "Our Stafford base helps us respond efficiently across central Stafford, the northern estates and communities along the A34 and A518 corridors.",
  },
  {
    slug: "cannock",
    name: "Cannock",
    county: "Staffordshire",
    postcodeAreas: ["WS11", "WS12"],
    nearby: ["Hednesford", "Heath Hayes", "Chadsmoor", "Great Wyrley"],
    intro: "We provide licensed property clearance and rubbish removal throughout Cannock, from single bulky-item collections to complete house and commercial clearances.",
    localDetail: "Cannock's mix of family homes, rental properties and commercial premises means every clearance is different, so we quote for the actual volume and access requirements.",
  },
  {
    slug: "lichfield",
    name: "Lichfield",
    county: "Staffordshire",
    postcodeAreas: ["WS13", "WS14"],
    nearby: ["Boley Park", "Darwin Park", "Streethay", "Shenstone"],
    intro: "Our Lichfield clearance service covers homes, gardens, offices and rental properties with careful loading and responsible waste handling.",
    localDetail: "We regularly plan access around Lichfield's historic centre, residential estates and nearby villages, helping customers avoid the inconvenience of arranging and loading a skip.",
  },
  {
    slug: "stone",
    name: "Stone",
    county: "Staffordshire",
    postcodeAreas: ["ST15"],
    nearby: ["Walton", "Meir Heath", "Yarnfield", "Barlaston"],
    intro: "We offer prompt property clearance, furniture removal and garden waste collection across Stone and its surrounding communities.",
    localDetail: "With Stone close to our Stafford base, we can arrange practical collection windows for town-centre properties, family homes and harder-to-access village locations.",
  },
  {
    slug: "rugeley",
    name: "Rugeley",
    county: "Staffordshire",
    postcodeAreas: ["WS15"],
    nearby: ["Brereton", "Etching Hill", "Armitage", "Handsacre"],
    intro: "Our Rugeley team handles house clearances, garage and loft contents, garden waste and bulky-item removal for homeowners, landlords and businesses.",
    localDetail: "We cover central Rugeley and communities toward Cannock Chase, assessing volume and access before work begins so the quote remains clear.",
  },
  {
    slug: "eccleshall",
    name: "Eccleshall",
    county: "Staffordshire",
    postcodeAreas: ["ST21"],
    nearby: ["Slindon", "Great Bridgeford", "Gnosall", "Woodseaves"],
    intro: "We provide flexible clearance and waste collection in Eccleshall, including rural properties, garages, sheds and full household clearances.",
    localDetail: "Rural lanes, outbuildings and larger plots can require a different loading plan; we confirm vehicle access and the items to be removed when quoting.",
  },
  {
    slug: "penkridge",
    name: "Penkridge",
    county: "Staffordshire",
    postcodeAreas: ["ST19"],
    nearby: ["Acton Trussell", "Dunston", "Brewood", "Wheaton Aston"],
    intro: "Our Penkridge services include household clearance, garden waste, furniture collection and commercial rubbish removal.",
    localDetail: "Convenient access from Stafford allows us to serve Penkridge and nearby villages with scheduled collections and same-day availability when the diary permits.",
  },
  {
    slug: "uttoxeter",
    name: "Uttoxeter",
    county: "Staffordshire",
    postcodeAreas: ["ST14"],
    nearby: ["Bramshall", "Doveridge", "Rocester", "Marchington"],
    intro: "We clear homes, gardens, offices and rental properties across Uttoxeter, taking care of lifting, loading and responsible disposal.",
    localDetail: "Our coverage extends from Uttoxeter town centre to nearby villages and rural properties, with access and travel considered in every written quote.",
  },
  {
    slug: "newport",
    name: "Newport",
    county: "Shropshire",
    postcodeAreas: ["TF10"],
    nearby: ["Chetwynd", "Edgmond", "Lilleshall", "Gnosall"],
    intro: "We provide property clearance and rubbish removal in Newport for households, landlords, estate agents and local businesses.",
    localDetail: "Newport sits within our wider Stafford and Shropshire service area, and we arrange collections according to volume, property access and the type of material involved.",
  },
];

export const getServiceArea = (slug: string) =>
  serviceAreas.find((area) => area.slug === slug);
