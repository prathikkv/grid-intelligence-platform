// proxy.js - Enterprise Pharmaceutical Intelligence API Backend
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3001;

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for dev, configure properly in production
}));
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.vercel.app', 'https://your-custom-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});
app.use('/api/', limiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Enterprise Demo Data Generators
class EnterpriseDataGenerator {
  static generateClinicalTrialsData(params) {
    const conditions = ['Cancer', 'Diabetes', 'Alzheimer', 'COVID-19', 'Heart Disease', 'Arthritis', 'Depression'];
    const phases = ['Phase I', 'Phase II', 'Phase III', 'Phase IV'];
    const statuses = ['Recruiting', 'Active, not recruiting', 'Completed', 'Suspended', 'Terminated', 'Withdrawn'];
    const sponsors = ['Pfizer Inc.', 'Roche', 'Novartis', 'Merck & Co.', 'Bristol Myers Squibb', 'AstraZeneca', 'Johnson & Johnson', 'Gilead Sciences', 'Biogen', 'Amgen'];
    
    const studies = Array.from({ length: 25 }, (_, i) => ({
      nctId: `NCT0${(Math.random() * 100000000).toString().padStart(8, '0')}`,
      briefTitle: `${phases[Math.floor(Math.random() * phases.length)]} Study of ${params.drug || 'Novel Therapy'} for ${params.condition || conditions[Math.floor(Math.random() * conditions.length)]}`,
      detailedDescription: `This is a randomized, double-blind, placebo-controlled study to evaluate the safety and efficacy of ${params.drug || 'investigational drug'} in patients with ${params.condition || 'target condition'}.`,
      condition: params.condition || conditions[Math.floor(Math.random() * conditions.length)],
      intervention: params.drug || 'Investigational Drug',
      phase: params.phase || phases[Math.floor(Math.random() * phases.length)],
      overallStatus: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: new Date(2020 + Math.random() * 4, Math.random() * 12, Math.random() * 28).toISOString().split('T')[0],
      completionDate: new Date(2024 + Math.random() * 3, Math.random() * 12, Math.random() * 28).toISOString().split('T')[0],
      enrollmentCount: Math.floor(Math.random() * 2000) + 50,
      studyType: Math.random() > 0.8 ? 'Observational' : 'Interventional',
      sponsor: sponsors[Math.floor(Math.random() * sponsors.length)],
      location: `${Math.random() > 0.5 ? 'United States' : 'Global'} | ${Math.floor(Math.random() * 50) + 10} sites`,
      primaryOutcome: 'Overall survival, progression-free survival',
      secondaryOutcome: 'Safety, tolerability, quality of life measures'
    }));

    return {
      studies: studies,
      totalCount: Math.floor(Math.random() * 500) + 100,
      metadata: {
        query: params.query || '',
        searchDate: new Date().toISOString(),
        database: 'ClinicalTrials.gov',
        api_version: '2.0'
      }
    };
  }

  static generatePubChemData(params) {
    const compound = params.compound || 'imatinib';
    
    const compounds = Array.from({ length: 15 }, (_, i) => ({
      cid: Math.floor(Math.random() * 10000000) + 1000,
      iupacName: `${compound}-derivative-${i + 1}`,
      molecularFormula: `C${Math.floor(Math.random() * 30) + 10}H${Math.floor(Math.random() * 40) + 15}N${Math.floor(Math.random() * 5) + 1}O${Math.floor(Math.random() * 8) + 2}`,
      molecularWeight: (Math.random() * 600 + 200).toFixed(2),
      canonicalSmiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O[sample_smiles]',
      inchi: 'InChI=1S/C16H24O2/c1-11(2)9-13-5-7-14(8-6-13)12(3)16(17)18-10-15-4/h5-8,11-12H,9-10H2,1-4H3',
      inchiKey: 'SAMPLE-INCHIKEY-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      xlogp: (Math.random() * 8 - 1).toFixed(2),
      tpsa: (Math.random() * 200).toFixed(2),
      heavyAtomCount: Math.floor(Math.random() * 50) + 10,
      hbondDonorCount: Math.floor(Math.random() * 8),
      hbondAcceptorCount: Math.floor(Math.random() * 12),
      rotatableBondCount: Math.floor(Math.random() * 15),
      complexity: (Math.random() * 1000 + 100).toFixed(0),
      exactMass: (Math.random() * 600 + 200).toFixed(4),
      charge: Math.floor(Math.random() * 3) - 1,
      isotopeAtomCount: Math.floor(Math.random() * 3),
      covalentUnitCount: 1
    }));

    return {
      compounds: compounds,
      metadata: {
        query: compound,
        searchDate: new Date().toISOString(),
        database: 'PubChem',
        totalResults: compounds.length
      }
    };
  }

  static generateFDAData(params) {
    const reactions = ['Nausea', 'Headache', 'Fatigue', 'Dizziness', 'Rash', 'Diarrhea', 'Vomiting', 'Insomnia', 'Anxiety', 'Pain', 'Fever', 'Cough', 'Dyspnea', 'Edema', 'Hypotension'];
    const outcomes = ['Recovered/Resolved', 'Recovering/Resolving', 'Not recovered/Not resolved', 'Recovered/Resolved with sequelae', 'Fatal', 'Unknown'];
    
    const adverseEvents = Array.from({ length: 30 }, (_, i) => ({
      safetyReportId: `US-${Math.random().toString().slice(-10).toUpperCase()}`,
      receiveDate: new Date(2020 + Math.random() * 4, Math.random() * 12, Math.random() * 28).toISOString().split('T')[0].replace(/-/g, ''),
      reaction: reactions[Math.floor(Math.random() * reactions.length)],
      seriousness: Math.random() > 0.7 ? 'Serious' : 'Non-serious',
      outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
      patientAge: Math.floor(Math.random() * 80) + 18,
      patientSex: Math.random() > 0.5 ? 'Female' : 'Male',
      patientWeight: Math.floor(Math.random() * 100) + 45,
      indication: params.condition || 'Unknown',
      dosage: `${Math.floor(Math.random() * 500) + 10}mg`,
      routeOfAdministration: Math.random() > 0.5 ? 'Oral' : 'Intravenous',
      concomitantMedications: Math.floor(Math.random() * 5),
      reportCountry: Math.random() > 0.8 ? 'United States' : ['Canada', 'United Kingdom', 'Germany', 'France', 'Japan'][Math.floor(Math.random() * 5)]
    }));

    return {
      adverseEvents: adverseEvents,
      totalResults: Math.floor(Math.random() * 10000) + 500,
      metadata: {
        query: params.drug || '',
        searchDate: new Date().toISOString(),
        database: 'FDA OpenFDA',
        disclaimer: 'This data is for research purposes only and should not be used for medical decisions.'
      }
    };
  }

  static generateChEMBLData(params) {
    const targetTypes = ['SINGLE PROTEIN', 'PROTEIN COMPLEX', 'PROTEIN FAMILY', 'CELL-LINE', 'TISSUE'];
    const assayTypes = ['Binding', 'Functional', 'ADMET', 'Toxicity', 'Physicochemical'];
    const standardTypes = ['IC50', 'EC50', 'Ki', 'Kd', 'CC50', 'LC50'];
    
    const molecules = Array.from({ length: 20 }, (_, i) => ({
      chemblId: `CHEMBL${Math.floor(Math.random() * 1000000) + 100000}`,
      prefName: params.query ? `${params.query}-analog-${i + 1}` : `Compound-${i + 1}`,
      maxPhase: Math.floor(Math.random() * 5),
      molecularWeight: (Math.random() * 800 + 150).toFixed(2),
      alogp: (Math.random() * 8 - 2).toFixed(2),
      psa: (Math.random() * 200).toFixed(2),
      hba: Math.floor(Math.random() * 15),
      hbd: Math.floor(Math.random() * 8),
      rotb: Math.floor(Math.random() * 20),
      aroRings: Math.floor(Math.random() * 6),
      heavyAtoms: Math.floor(Math.random() * 60) + 10,
      qedScore: Math.random().toFixed(3),
      cxLogp: (Math.random() * 8 - 2).toFixed(2),
      cxLogd: (Math.random() * 8 - 2).toFixed(2),
      activities: Array.from({ length: Math.floor(Math.random() * 8) + 1 }, (_, j) => ({
        activityId: Math.floor(Math.random() * 10000000),
        standardType: standardTypes[Math.floor(Math.random() * standardTypes.length)],
        standardValue: (Math.pow(10, Math.random() * 6 - 3)).toFixed(2),
        standardUnits: Math.random() > 0.5 ? 'nM' : 'uM',
        targetChemblId: `CHEMBL${Math.floor(Math.random() * 100000) + 1000}`,
        targetName: `Target protein ${j + 1}`,
        targetType: targetTypes[Math.floor(Math.random() * targetTypes.length)],
        assayType: assayTypes[Math.floor(Math.random() * assayTypes.length)],
        confidence: Math.floor(Math.random() * 4) + 6 // 6-9 confidence score
      }))
    }));

    return {
      molecules: molecules,
      metadata: {
        query: params.query || '',
        searchDate: new Date().toISOString(),
        database: 'ChEMBL',
        version: 'ChEMBL_31',
        totalResults: molecules.length
      }
    };
  }

  static generateUniProtData(params) {
    const organisms = ['Homo sapiens', 'Mus musculus', 'Rattus norvegicus', 'Drosophila melanogaster', 'Caenorhabditis elegans'];
    const subcellularLocations = ['Nucleus', 'Cytoplasm', 'Membrane', 'Mitochondrion', 'Endoplasmic reticulum', 'Golgi apparatus'];
    const functions = [
      'Catalyzes the phosphorylation of target proteins',
      'Involved in cell cycle regulation and DNA repair',
      'Functions as a transcriptional regulator',
      'Plays a role in protein folding and quality control',
      'Mediates signal transduction pathways',
      'Involved in metabolic processes and enzyme regulation'
    ];

    const proteins = Array.from({ length: 12 }, (_, i) => ({
      accession: `P${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      entryName: `${params.query || 'PROTEIN'}_${i + 1}_HUMAN`,
      proteinName: `${params.query || 'Target protein'} ${i + 1}`,
      geneName: `${params.query || 'GENE'}${i + 1}`,
      organism: organisms[Math.floor(Math.random() * organisms.length)],
      length: Math.floor(Math.random() * 3000) + 100,
      mass: Math.floor(Math.random() * 300000) + 10000,
      sequence: 'MKWVTFISLLFLFSSAYSRGVFRRDAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLFFAKRYKAAFTECCQAADKAACLLPKLDELRDEGKASSAKQRLKCASLQKFGERAFKAWAVARLSQRFPKAEFAEVSKLVTDLTKVHTECCHGDLLECADDRADLAKYICENQDSISSKLKECCEKPLLEKSHCIAEVENDEMPADLPSLAADFVESKDVCKNYAE...',
      function: functions[Math.floor(Math.random() * functions.length)],
      subcellularLocation: subcellularLocations[Math.floor(Math.random() * subcellularLocations.length)],
      diseases: ['Cancer', 'Diabetes', 'Alzheimer disease', 'Parkinson disease', 'Heart disease'][Math.floor(Math.random() * 5)],
      domains: ['Protein kinase domain', 'DNA-binding domain', 'Transmembrane region', 'Signal peptide', 'Coiled coil'][Math.floor(Math.random() * 5)],
      modifications: ['Phosphorylation', 'Ubiquitination', 'Methylation', 'Acetylation'][Math.floor(Math.random() * 4)],
      interactions: Math.floor(Math.random() * 50) + 5,
      publications: Math.floor(Math.random() * 200) + 10,
      goTerms: {
        biological_process: ['GO:0008150', 'GO:0009987', 'GO:0008152'][Math.floor(Math.random() * 3)],
        molecular_function: ['GO:0003674', 'GO:0005515', 'GO:0016740'][Math.floor(Math.random() * 3)],
        cellular_component: ['GO:0005575', 'GO:0005623', 'GO:0044464'][Math.floor(Math.random() * 3)]
      }
    }));

    return {
      proteins: proteins,
      metadata: {
        query: params.query || '',
        searchDate: new Date().toISOString(),
        database: 'UniProt',
        release: '2024_01',
        totalResults: proteins.length
      }
    };
  }

  static generateOpenTargetsData(params) {
    const diseaseAreas = ['Neoplasm', 'Cardiovascular disease', 'Nervous system disease', 'Immune system disease', 'Metabolic disease'];
    const evidenceTypes = ['Genetic association', 'Somatic mutation', 'Drugs', 'Pathways & systems biology', 'Text mining', 'RNA expression', 'Protein interactions'];
    
    const associations = Array.from({ length: 10 }, (_, i) => ({
      targetId: `ENSG00000${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      targetSymbol: `${params.query || 'TARGET'}${i + 1}`,
      targetName: `${params.query || 'Target protein'} ${i + 1}`,
      diseaseId: `EFO_${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      diseaseName: diseaseAreas[Math.floor(Math.random() * diseaseAreas.length)],
      diseaseArea: diseaseAreas[Math.floor(Math.random() * diseaseAreas.length)],
      overallScore: Math.random().toFixed(3),
      geneticAssociationScore: Math.random().toFixed(3),
      somaticMutationScore: Math.random().toFixed(3),
      drugsScore: Math.random().toFixed(3),
      pathwaysScore: Math.random().toFixed(3),
      textMiningScore: Math.random().toFixed(3),
      rnaExpressionScore: Math.random().toFixed(3),
      proteinInteractionScore: Math.random().toFixed(3),
      tractabilityAntibody: Math.floor(Math.random() * 10) + 1,
      tractabilitySmallMolecule: Math.floor(Math.random() * 10) + 1,
      safetyBucket: Math.floor(Math.random() * 4) + 1,
      evidenceCount: Math.floor(Math.random() * 100) + 10,
      approvedDrugs: Math.floor(Math.random() * 5),
      clinicalTrials: Math.floor(Math.random() * 20) + 1,
      publications: Math.floor(Math.random() * 500) + 50
    }));

    return {
      associations: associations,
      metadata: {
        query: params.query || '',
        searchDate: new Date().toISOString(),
        database: 'Open Targets Platform',
        version: '23.12',
        totalResults: associations.length
      }
    };
  }
}

// API Routes
app.get('/api/proxy', async (req, res) => {
  try {
    const { apiName, endpoint, params } = req.query;
    const parsedParams = params ? JSON.parse(params) : {};
    
    console.log(`📡 Processing request: ${apiName} - ${endpoint}`, parsedParams);
    
    let data;
    
    // Route to appropriate data generator based on API name
    switch (apiName) {
      case 'ClinicalTrials':
        data = EnterpriseDataGenerator.generateClinicalTrialsData(parsedParams);
        break;
        
      case 'PubChem':
        data = EnterpriseDataGenerator.generatePubChemData(parsedParams);
        break;
        
      case 'FDA':
        data = EnterpriseDataGenerator.generateFDAData(parsedParams);
        break;
        
      case 'ChEMBL':
        data = EnterpriseDataGenerator.generateChEMBLData(parsedParams);
        break;
        
      case 'UniProt':
        data = EnterpriseDataGenerator.generateUniProtData(parsedParams);
        break;
        
      case 'OpenTargets':
        data = EnterpriseDataGenerator.generateOpenTargetsData(parsedParams);
        break;
        
      default:
        throw new Error(`Unsupported API: ${apiName}`);
    }
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
    
    res.json({
      success: true,
      data: data,
      metadata: {
        apiName,
        endpoint,
        timestamp: new Date().toISOString(),
        processingTime: Math.random() * 2000 + 500,
        cached: false,
        demo: true
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message,
        code: 'API_ERROR',
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  const databases = [
    'ClinicalTrials', 'PubChem', 'FDA', 'ChEMBL', 
    'UniProt', 'OpenTargets', 'HPA', 'DrugBank',
    'ClinVar', 'COSMIC', 'IMS', 'PatentScope'
  ];
  
  const statuses = {};
  databases.forEach(db => {
    statuses[db] = {
      online: true,
      latency: Math.floor(Math.random() * 500) + 100,
      lastChecked: new Date().toISOString()
    };
  });
  
  res.json({
    databases: statuses,
    overall: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Endpoint not found',
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString()
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Enterprise Pharmaceutical Intelligence API Server running on port ${port}`);
    console.log(`🔗 Health check: http://localhost:${port}/api/health`);
    console.log(`📊 API status: http://localhost:${port}/api/status`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;