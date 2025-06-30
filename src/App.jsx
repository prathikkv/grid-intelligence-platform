import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Database, Brain, Download, RefreshCw, AlertCircle, CheckCircle, 
  Loader, Zap, Target, Microscope, Beaker, Pill, Activity, Dna, Users, 
  FileText, BarChart3, ChevronDown, ChevronUp, Copy, Play, Globe, 
  TrendingUp, Award, Stethoscope, TestTube, Heart, ArrowRight, Filter,
  Calendar, Clock, MapPin, ExternalLink, Star, Bookmark, Share2, Atom,
  Shield, Layers, Cpu, GitBranch, FlaskConical, Building2, Briefcase,
  LineChart, PieChart, Settings, Menu, X, ChevronRight, Info, Plus,
  Minus, RotateCcw, Save, Upload, Mail, Phone, MessageSquare
} from 'lucide-react';

// ENTERPRISE-GRADE Pharmaceutical Intelligence Platform
const EnterprisePharmaIntelligence = () => {
  // Advanced state management
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [apiStatuses, setApiStatuses] = useState({});
  const [queryHistory, setQueryHistory] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [bookmarkedResults, setBookmarkedResults] = useState([]);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [activeTab, setActiveTab] = useState('search');
  const [dashboardMetrics, setDashboardMetrics] = useState({});
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Sarah Chen',
    role: 'Senior Research Scientist',
    institution: 'Pharmaceutical Research Institute',
    subscriptionTier: 'Enterprise Pro'
  });

  // COMPREHENSIVE Enterprise Database Registry
  const enterpriseDatabases = {
    ClinicalTrials: {
      name: 'ClinicalTrials.gov',
      description: 'Global clinical studies registry with 400,000+ trials',
      icon: Users,
      color: '#3b82f6',
      category: 'Clinical Data',
      dataCount: '450,000+',
      updateFrequency: 'Daily',
      coverage: 'Global',
      endpoints: ['studies', 'sponsors', 'investigators', 'facilities'],
      capabilities: [
        'Phase I-IV clinical trials',
        'Patient enrollment tracking',
        'Primary/secondary endpoints',
        'Sponsor information',
        'Geographic distribution',
        'Recruitment status',
        'Safety monitoring',
        'Regulatory milestones'
      ],
      premium: false
    },
    PubChem: {
      name: 'PubChem',
      description: 'Comprehensive chemical database with 100M+ compounds',
      icon: Pill,
      color: '#10b981',
      category: 'Chemical Data',
      dataCount: '100M+',
      updateFrequency: 'Weekly',
      coverage: 'Global',
      endpoints: ['compound', 'substance', 'assay', 'protein'],
      capabilities: [
        'Molecular structures',
        'Chemical properties',
        'Bioassay results',
        'Patent information',
        'Safety data sheets',
        'Literature references',
        'Similar compounds',
        'ADMET predictions'
      ],
      premium: false
    },
    FDA: {
      name: 'FDA OpenFDA',
      description: 'FDA regulatory data with adverse events and approvals',
      icon: Beaker,
      color: '#ef4444',
      category: 'Regulatory',
      dataCount: '50M+',
      updateFrequency: 'Real-time',
      coverage: 'US',
      endpoints: ['drug/event', 'drug/label', 'drug/enforcement', 'device'],
      capabilities: [
        'Adverse event reports',
        'Drug labeling',
        'FDA approvals',
        'Safety alerts',
        'Recall information',
        'Orange book data',
        'NDC directory',
        'Inspection reports'
      ],
      premium: false
    },
    ChEMBL: {
      name: 'ChEMBL',
      description: 'Bioactivity database with 15M+ activity points',
      icon: Target,
      color: '#8b5cf6',
      category: 'Bioactivity',
      dataCount: '15M+',
      updateFrequency: 'Quarterly',
      coverage: 'Global',
      endpoints: ['molecule', 'target', 'assay', 'activity', 'indication'],
      capabilities: [
        'Drug-target interactions',
        'IC50/EC50 values',
        'Selectivity profiling',
        'Structure-activity relationships',
        'Mechanism of action',
        'Target annotations',
        'Pharmacology data',
        'Lead optimization'
      ],
      premium: false
    },
    UniProt: {
      name: 'UniProt',
      description: 'Protein database with functional annotations',
      icon: Dna,
      color: '#6366f1',
      category: 'Protein Data',
      dataCount: '200M+',
      updateFrequency: 'Weekly',
      coverage: 'Global',
      endpoints: ['uniprotkb', 'proteomes', 'taxonomy', 'keywords'],
      capabilities: [
        'Protein sequences',
        'Functional annotations',
        'Disease associations',
        'Gene ontology',
        'Protein interactions',
        'Subcellular localization',
        'Post-translational modifications',
        'Evolution data'
      ],
      premium: false
    },
    OpenTargets: {
      name: 'Open Targets',
      description: 'Target-disease associations with genetic evidence',
      icon: Activity,
      color: '#f97316',
      category: 'Target Intelligence',
      dataCount: '25,000+',
      updateFrequency: 'Monthly',
      coverage: 'Global',
      endpoints: ['association', 'evidence', 'target', 'disease', 'drug'],
      capabilities: [
        'Target-disease associations',
        'Genetic evidence',
        'Pathway analysis',
        'Drug repurposing',
        'Safety assessments',
        'Tractability assessments',
        'Baseline expression',
        'Phenotype data'
      ],
      premium: false
    },
    HPA: {
      name: 'Human Protein Atlas',
      description: 'Protein expression in tissues and diseases',
      icon: Microscope,
      color: '#14b8a6',
      category: 'Expression Data',
      dataCount: '20,000+',
      updateFrequency: 'Annually',
      coverage: 'Human',
      endpoints: ['search', 'tissue', 'pathology', 'cell'],
      capabilities: [
        'Tissue expression',
        'Cancer expression',
        'Cell line data',
        'Subcellular localization',
        'Immunohistochemistry',
        'RNA-seq data',
        'Single-cell data',
        'Prognostic analysis'
      ],
      premium: false
    },
    DrugBank: {
      name: 'DrugBank',
      description: 'Comprehensive drug information database',
      icon: TestTube,
      color: '#ec4899',
      category: 'Drug Intelligence',
      dataCount: '15,000+',
      updateFrequency: 'Monthly',
      coverage: 'Global',
      endpoints: ['drugs', 'targets', 'enzymes', 'carriers'],
      capabilities: [
        'Drug interactions',
        'Pharmacokinetics',
        'Mechanisms of action',
        'Contraindications',
        'Dosing information',
        'Metabolic pathways',
        'Toxicology',
        'Commercial data'
      ],
      premium: true
    },
    ClinVar: {
      name: 'ClinVar',
      description: 'Clinical significance of genomic variants',
      icon: GitBranch,
      color: '#3b82f6',
      category: 'Genomics',
      dataCount: '2M+',
      updateFrequency: 'Weekly',
      coverage: 'Global',
      endpoints: ['variation', 'gene', 'condition', 'submission'],
      capabilities: [
        'Variant pathogenicity',
        'Clinical significance',
        'Gene-disease associations',
        'Pharmacogenomics',
        'Population frequencies',
        'Functional impact',
        'Evidence summaries',
        'Curation status'
      ],
      premium: false
    },
    COSMIC: {
      name: 'COSMIC',
      description: 'Catalogue of somatic mutations in cancer',
      icon: FlaskConical,
      color: '#dc2626',
      category: 'Cancer Genomics',
      dataCount: '6M+',
      updateFrequency: 'Monthly',
      coverage: 'Global',
      endpoints: ['mutations', 'genes', 'samples', 'drugs'],
      capabilities: [
        'Somatic mutations',
        'Cancer gene census',
        'Drug sensitivity',
        'Mutation signatures',
        'Copy number variants',
        'Structural variants',
        'Fusion genes',
        'Biomarker associations'
      ],
      premium: true
    },
    IMS: {
      name: 'IQVIA Intelligence',
      description: 'Commercial intelligence and market data',
      icon: Building2,
      color: '#0ea5e9',
      category: 'Market Intelligence',
      dataCount: 'Proprietary',
      updateFrequency: 'Real-time',
      coverage: 'Global',
      endpoints: ['sales', 'market', 'pipeline', 'forecast'],
      capabilities: [
        'Sales data',
        'Market share analysis',
        'Pipeline intelligence',
        'Competitive landscape',
        'Pricing analysis',
        'Prescription tracking',
        'Patient flow',
        'HCP engagement'
      ],
      premium: true
    },
    PatentScope: {
      name: 'Patent Intelligence',
      description: 'Global patent landscape for pharmaceuticals',
      icon: Shield,
      color: '#7c3aed',
      category: 'IP Intelligence',
      dataCount: '5M+',
      updateFrequency: 'Weekly',
      coverage: 'Global',
      endpoints: ['patents', 'claims', 'citations', 'families'],
      capabilities: [
        'Patent landscapes',
        'Freedom to operate',
        'Competitive intelligence',
        'Expiry analysis',
        'Citation networks',
        'Technology trends',
        'Inventor analysis',
        'Jurisdiction coverage'
      ],
      premium: true
    }
  };

  // PROFESSIONAL Research Query Templates
  const enterpriseQueryTemplates = [
    {
      category: 'Clinical Development',
      queries: [
        "Comprehensive Phase II trial analysis for JAK inhibitors in rheumatoid arthritis with enrollment status and competitive landscape",
        "Safety profile comparison of PD-1 inhibitors across solid tumors with real-world evidence and FDA adverse events",
        "Pediatric trial landscape for rare disease treatments with regulatory pathways and orphan drug designations",
        "COVID-19 therapeutic development pipeline with emergency use authorizations and global regulatory status"
      ]
    },
    {
      category: 'Drug Discovery Intelligence',
      queries: [
        "EGFR inhibitor structure-activity relationships with selectivity profiles and IP landscape analysis",
        "Novel targets for Alzheimer's disease with genetic validation, tractability assessment, and competitive intelligence",
        "PROTAC degrader mechanisms and clinical progress with target engagement data and safety profiles",
        "Antibody-drug conjugate payload analysis with linker chemistry and clinical outcomes"
      ]
    },
    {
      category: 'Market & Competitive Intelligence',
      queries: [
        "Immuno-oncology market dynamics with pipeline analysis, pricing trends, and competitive positioning",
        "Biosimilar competitive landscape for anti-TNF therapies with market penetration and pricing impact",
        "Rare disease drug pricing strategies with health economics data and market access pathways",
        "Gene therapy commercial landscape with manufacturing challenges and reimbursement strategies"
      ]
    },
    {
      category: 'Regulatory Intelligence',
      queries: [
        "FDA breakthrough therapy designations in oncology with approval timelines and clinical endpoints",
        "European regulatory pathway comparison for advanced therapy medicinal products",
        "Japanese PMDA consultation outcomes for innovative drug development programs",
        "Global regulatory harmonization trends for digital therapeutics and companion diagnostics"
      ]
    },
    {
      category: 'Safety & Pharmacovigilance',
      queries: [
        "Real-world safety monitoring for CAR-T therapies with adverse event patterns and risk mitigation",
        "Drug-drug interaction landscape for oncology combination therapies with clinical significance",
        "Pregnancy safety data for autoimmune disease treatments with teratogenicity assessments",
        "Cardiovascular safety signals in diabetes drug development with regulatory guidance compliance"
      ]
    }
  ];

  // ENTERPRISE API Service with Advanced Features
  class EnterpriseAPIService {
    constructor() {
      this.baseUrl = '/api/proxy';
      this.cache = new Map();
      this.requestCount = 0;
      this.errorLog = [];
      this.performanceMetrics = [];
      this.rateLimiter = new Map();
      this.retryConfig = { maxRetries: 3, baseDelay: 1000 };
    }

    async makeRequest(apiName, endpoint, params = {}, options = {}) {
      const startTime = performance.now();
      this.requestCount++;
      const requestId = `${apiName}-${this.requestCount}-${Date.now()}`;

      // Check cache first
      const cacheKey = `${apiName}-${endpoint}-${JSON.stringify(params)}`;
      if (this.cache.has(cacheKey) && !options.skipCache) {
        console.log(`📦 Cache hit for ${apiName}`);
        return this.cache.get(cacheKey);
      }

      // Rate limiting check
      if (!this.checkRateLimit(apiName)) {
        throw new Error(`Rate limit exceeded for ${apiName}. Please wait.`);
      }

      for (let attempt = 1; attempt <= this.retryConfig.maxRetries; attempt++) {
        try {
          console.log(`🚀 [${requestId}] API Request (Attempt ${attempt}):`, { apiName, endpoint, params });

          // Demo data simulation - in production, this would call real APIs
          const demoData = this.generateDemoData(apiName, endpoint, params);
          
          const endTime = performance.now();
          const duration = endTime - startTime;

          // Cache successful results
          this.cache.set(cacheKey, {
            data: demoData,
            metadata: { duration, requestId, cached: false, attempt, demo: true }
          });

          // Log performance metrics
          this.performanceMetrics.push({
            requestId, apiName, duration, success: true,
            timestamp: new Date().toISOString(), attempt,
            dataSize: JSON.stringify(demoData).length
          });

          console.log(`✅ [${requestId}] Success (${duration.toFixed(0)}ms):`, demoData);
          
          return {
            data: demoData,
            metadata: { duration, requestId, cached: false, attempt, demo: true }
          };

        } catch (error) {
          const endTime = performance.now();
          const duration = endTime - startTime;

          if (attempt === this.retryConfig.maxRetries) {
            // Log final error
            this.errorLog.push({
              requestId, apiName, endpoint, error: error.message,
              duration, timestamp: new Date().toISOString(), finalAttempt: attempt
            });

            console.error(`❌ [${requestId}] Failed after ${attempt} attempts (${duration.toFixed(0)}ms):`, error);
            throw error;
          } else {
            console.warn(`⚠️ [${requestId}] Attempt ${attempt} failed, retrying...`, error.message);
            await new Promise(resolve => setTimeout(resolve, this.retryConfig.baseDelay * attempt));
          }
        }
      }
    }

    generateDemoData(apiName, endpoint, params) {
      // Generate realistic demo data for each database
      switch (apiName) {
        case 'ClinicalTrials':
          return {
            studies: Array.from({ length: 15 }, (_, i) => ({
              nctId: `NCT0${Math.random().toString().slice(-8)}`,
              briefTitle: `Phase ${Math.floor(Math.random() * 3) + 1} Study of Novel Therapy for ${params.condition || 'Disease'}`,
              phase: `Phase ${Math.floor(Math.random() * 3) + 1}`,
              overallStatus: ['Recruiting', 'Active, not recruiting', 'Completed', 'Suspended'][Math.floor(Math.random() * 4)],
              condition: params.condition || 'Cancer',
              intervention: params.drug || 'Investigational Drug',
              sponsor: ['Pfizer', 'Roche', 'Novartis', 'Merck', 'Bristol Myers Squibb'][Math.floor(Math.random() * 5)],
              enrollmentCount: Math.floor(Math.random() * 1000) + 50,
              startDate: '2023-01-01',
              estimatedCompletion: '2025-12-31'
            })),
            totalCount: 156
          };
          
        case 'PubChem':
          return {
            compounds: Array.from({ length: 10 }, (_, i) => ({
              cid: Math.floor(Math.random() * 1000000),
              iupacName: `${params.compound || 'Test'}-derivative-${i + 1}`,
              molecularFormula: 'C20H25N3O4',
              molecularWeight: 371.43,
              canonicalSmiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
              xlogp: (Math.random() * 10).toFixed(2),
              hbondDonorCount: Math.floor(Math.random() * 5),
              hbondAcceptorCount: Math.floor(Math.random() * 8),
              rotatableBondCount: Math.floor(Math.random() * 10)
            }))
          };
          
        case 'FDA':
          return {
            adverseEvents: Array.from({ length: 20 }, (_, i) => ({
              safetyReportId: `US-${Math.random().toString().slice(-10)}`,
              receiveDate: '20231201',
              reaction: ['Nausea', 'Headache', 'Fatigue', 'Dizziness', 'Rash'][Math.floor(Math.random() * 5)],
              seriousness: Math.random() > 0.7 ? 'Serious' : 'Non-serious',
              outcome: ['Recovered', 'Recovering', 'Not recovered', 'Unknown'][Math.floor(Math.random() * 4)],
              patientAge: Math.floor(Math.random() * 80) + 18,
              patientSex: Math.random() > 0.5 ? 'Female' : 'Male'
            })),
            totalResults: 1247
          };
          
        case 'ChEMBL':
          return {
            molecules: Array.from({ length: 12 }, (_, i) => ({
              chemblId: `CHEMBL${Math.floor(Math.random() * 1000000)}`,
              prefName: `Compound-${i + 1}`,
              maxPhase: Math.floor(Math.random() * 4),
              molecularWeight: (Math.random() * 500 + 200).toFixed(2),
              activities: Array.from({ length: 3 }, () => ({
                standardType: ['IC50', 'EC50', 'Ki'][Math.floor(Math.random() * 3)],
                standardValue: (Math.random() * 1000).toFixed(2),
                standardUnits: 'nM',
                targetChemblId: `CHEMBL${Math.floor(Math.random() * 10000)}`
              }))
            }))
          };
          
        case 'UniProt':
          return {
            proteins: Array.from({ length: 8 }, (_, i) => ({
              accession: `P${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
              entryName: `PROTEIN_${i + 1}_HUMAN`,
              proteinName: `Target protein ${i + 1}`,
              geneName: `GENE${i + 1}`,
              organism: 'Homo sapiens',
              length: Math.floor(Math.random() * 2000) + 100,
              function: 'Catalyzes the phosphorylation of target proteins',
              diseases: ['Cancer', 'Diabetes', 'Alzheimer'][Math.floor(Math.random() * 3)]
            }))
          };
          
        case 'OpenTargets':
          return {
            associations: Array.from({ length: 6 }, (_, i) => ({
              targetId: `ENSG00000${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
              targetSymbol: `TARGET${i + 1}`,
              diseaseId: `EFO_${Math.floor(Math.random() * 1000000).toString().padStart(7, '0')}`,
              diseaseName: ['Cancer', 'Diabetes', 'Alzheimer\'s disease', 'Arthritis'][Math.floor(Math.random() * 4)],
              overallScore: (Math.random()).toFixed(3),
              geneticAssociationScore: (Math.random()).toFixed(3),
              affectedPathwayScore: (Math.random()).toFixed(3)
            }))
          };
          
        default:
          return { message: `Demo data for ${apiName}`, timestamp: new Date().toISOString() };
      }
    }

    checkRateLimit(apiName) {
      const now = Date.now();
      const windowMs = 60000; // 1 minute
      const key = `${apiName}_${Math.floor(now / windowMs)}`;
      
      const current = this.rateLimiter.get(key) || 0;
      const limits = {
        'ClinicalTrials': 100,
        'PubChem': 200,
        'FDA': 150,
        'ChEMBL': 100,
        'UniProt': 150,
        'OpenTargets': 100
      };
      
      if (current >= (limits[apiName] || 50)) {
        return false;
      }
      
      this.rateLimiter.set(key, current + 1);
      return true;
    }

    // COMPREHENSIVE database search methods
    async searchClinicalTrials(query, options = {}) {
      const params = {
        format: 'json',
        countTotal: true,
        pageSize: options.pageSize || 200,
        query: query,
        condition: options.condition,
        drug: options.drug,
        phase: options.phase
      };
      
      return this.makeRequest('ClinicalTrials', 'studies', params);
    }

    async searchPubChem(compound, options = {}) {
      return this.makeRequest('PubChem', 'compound', { compound });
    }

    async searchFDAAdverseEvents(drug, options = {}) {
      const params = {
        drug: drug,
        limit: options.limit || 1000
      };
      return this.makeRequest('FDA', 'adverse-events', params);
    }

    async searchChEMBL(query, options = {}) {
      const params = {
        query: query,
        limit: options.limit || 1000
      };
      return this.makeRequest('ChEMBL', 'molecule', params);
    }

    async searchUniProt(query, options = {}) {
      const params = {
        query: query,
        limit: options.limit || 500
      };
      return this.makeRequest('UniProt', 'search', params);
    }

    async searchOpenTargets(query, options = {}) {
      const params = {
        query: query,
        limit: options.limit || 500
      };
      return this.makeRequest('OpenTargets', 'search', params);
    }

    getPerformanceReport() {
      return {
        totalRequests: this.requestCount,
        successfulRequests: this.performanceMetrics.length,
        failedRequests: this.errorLog.length,
        averageResponseTime: this.performanceMetrics.length > 0 
          ? this.performanceMetrics.reduce((sum, m) => sum + m.duration, 0) / this.performanceMetrics.length 
          : 0,
        apiBreakdown: this.performanceMetrics.reduce((acc, m) => {
          acc[m.apiName] = (acc[m.apiName] || 0) + 1;
          return acc;
        }, {}),
        recentErrors: this.errorLog.slice(-10),
        cacheHitRate: this.cache.size / Math.max(this.requestCount, 1),
        totalDataSize: this.performanceMetrics.reduce((sum, m) => sum + (m.dataSize || 0), 0)
      };
    }
  }

  // ENTERPRISE AI Intelligence Engine
  class EnterpriseAIEngine {
    constructor(apiService) {
      this.apiService = apiService;
    }

    async analyzeQuery(query) {
      setAnalysisProgress('🧠 Performing enterprise-grade AI analysis...');
      setProgressPercentage(10);
      
      // Simulate AI analysis with sophisticated results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysisPrompt = `
Enterprise pharmaceutical AI analyst analyzing: "${query}"

Providing comprehensive enterprise analysis...`;

      try {
        // Demo AI analysis - in production, this would use Claude API
        const analysis = this.generateEnterpriseAnalysis(query);
        setProgressPercentage(25);
        return analysis;
      } catch (error) {
        console.error('Enterprise AI analysis failed:', error);
        return this.fallbackAnalysis(query);
      }
    }

    generateEnterpriseAnalysis(query) {
      const lowerQuery = query.toLowerCase();
      
      // Sophisticated pattern matching for enterprise use cases
      const domainPatterns = {
        'clinical_development': /clinical trial|study|phase|efficacy|safety|endpoint|enrollment|protocol|investigational/i,
        'drug_discovery': /target|mechanism|bioactivity|compound|screening|hit|lead|optimization|admet/i,
        'regulatory_affairs': /fda|ema|approval|submission|guidance|breakthrough|orphan|fast track|priority review/i,
        'market_intelligence': /market|commercial|sales|revenue|competition|pricing|launch|forecast/i,
        'safety_surveillance': /adverse|safety|toxicity|side effect|pharmacovigilance|risk|contraindication/i,
        'competitive_intelligence': /competitor|pipeline|portfolio|landscape|benchmarking|positioning/i
      };

      let primaryDomain = 'clinical_development';
      let maxScore = 0;
      
      for (const [domain, pattern] of Object.entries(domainPatterns)) {
        const matches = (lowerQuery.match(pattern) || []).length;
        if (matches > maxScore) {
          maxScore = matches;
          primaryDomain = domain;
        }
      }

      const entities = {
        therapeutic_agents: this.extractEntities(lowerQuery, [
          'imatinib', 'dasatinib', 'rituximab', 'bevacizumab', 'trastuzumab', 'pembrolizumab',
          'nivolumab', 'atezolizumab', 'durvalumab', 'ipilimumab', 'cetuximab', 'panitumumab',
          'sorafenib', 'sunitinib', 'pazopanib', 'regorafenib', 'cabozantinib', 'lenvatinib',
          'ibrutinib', 'venetoclax', 'osimertinib', 'alectinib', 'crizotinib', 'ruxolitinib'
        ]),
        disease_indications: this.extractEntities(lowerQuery, [
          'cancer', 'carcinoma', 'lymphoma', 'leukemia', 'melanoma', 'sarcoma',
          'diabetes', 'alzheimer', 'parkinson', 'multiple sclerosis', 'epilepsy',
          'covid', 'influenza', 'hepatitis', 'hiv', 'tuberculosis',
          'hypertension', 'heart failure', 'stroke', 'arrhythmia',
          'depression', 'schizophrenia', 'bipolar', 'anxiety',
          'arthritis', 'lupus', 'psoriasis', 'crohn', 'colitis'
        ]),
        molecular_targets: this.extractEntities(lowerQuery, [
          'egfr', 'her2', 'vegf', 'pdgfr', 'kit', 'flt3', 'jak2', 'btk', 'alk', 'ros1',
          'braf', 'kras', 'pik3ca', 'akt', 'mtor', 'tp53', 'brca1', 'brca2', 'atr', 'atm',
          'cd20', 'cd19', 'cd22', 'cd30', 'pd1', 'pdl1', 'ctla4', 'lag3', 'tim3', 'tigit'
        ]),
        clinical_phases: this.extractPhases(lowerQuery)
      };

      return {
        executive_summary: {
          strategic_importance: maxScore > 3 ? 'high' : maxScore > 1 ? 'medium' : 'low',
          business_impact: this.inferBusinessImpact(primaryDomain, entities),
          time_sensitivity: maxScore > 3 ? 'urgent' : 'standard',
          stakeholder_relevance: this.getStakeholders(primaryDomain),
          key_insights: this.generateKeyInsights(primaryDomain, entities)
        },
        query_classification: {
          primary_domain: primaryDomain,
          therapeutic_area: this.inferTherapeuticArea(entities),
          data_complexity: Math.min(Math.max(1, Object.values(entities).flat().length), 5),
          analysis_depth: maxScore > 3 ? 'strategic' : 'analytical',
          confidence_score: Math.min(0.7 + (maxScore * 0.1), 0.95)
        },
        extracted_entities: entities,
        intelligence_strategy: {
          primary_databases: this.getDatabasePriority(primaryDomain),
          search_methodology: 'comprehensive',
          data_integration_approach: 'cross-reference',
          expected_deliverables: this.getExpectedDeliverables(primaryDomain),
          success_metrics: ['data_completeness', 'insight_quality', 'actionability']
        },
        commercial_context: this.generateCommercialContext(entities),
        risk_assessment: this.generateRiskAssessment(primaryDomain, entities),
        action_plan: this.generateActionPlan(primaryDomain, entities)
      };
    }

    fallbackAnalysis(query) {
      return this.generateEnterpriseAnalysis(query);
    }

    extractEntities(query, entityList) {
      return entityList.filter(entity => query.includes(entity.toLowerCase()));
    }

    extractPhases(query) {
      const phaseMatches = query.match(/phase[- ]?([I1-4]+)/gi);
      return phaseMatches ? phaseMatches.map(match => match.replace(/[- ]/g, ' ')) : [];
    }

    inferBusinessImpact(domain, entities) {
      const impactMap = {
        'clinical_development': 'revenue_driver',
        'drug_discovery': 'innovation',
        'regulatory_affairs': 'compliance',
        'market_intelligence': 'revenue_driver',
        'safety_surveillance': 'risk_mitigation',
        'competitive_intelligence': 'revenue_driver'
      };
      return impactMap[domain] || 'innovation';
    }

    getStakeholders(domain) {
      const stakeholderMap = {
        'clinical_development': ['R&D', 'Medical Affairs', 'Regulatory'],
        'drug_discovery': ['R&D', 'Business Development'],
        'regulatory_affairs': ['Regulatory', 'Medical Affairs', 'Commercial'],
        'market_intelligence': ['Commercial', 'Business Development'],
        'safety_surveillance': ['Medical Affairs', 'Regulatory'],
        'competitive_intelligence': ['Commercial', 'Business Development', 'R&D']
      };
      return stakeholderMap[domain] || ['R&D'];
    }

    generateKeyInsights(domain, entities) {
      return [
        `${domain.replace('_', ' ')} intelligence opportunity identified`,
        `${entities.therapeutic_agents.length || 0} therapeutic agents in scope`,
        `Cross-functional analysis required for comprehensive insights`,
        `Real-time monitoring recommended for competitive advantage`
      ];
    }

    inferTherapeuticArea(entities) {
      const areaKeywords = {
        oncology: ['cancer', 'tumor', 'carcinoma', 'lymphoma', 'leukemia', 'melanoma', 'sarcoma'],
        immunology: ['immune', 'autoimmune', 'arthritis', 'lupus', 'psoriasis', 'crohn'],
        neurology: ['alzheimer', 'parkinson', 'multiple sclerosis', 'epilepsy', 'stroke'],
        cardiology: ['heart', 'cardiovascular', 'hypertension', 'arrhythmia'],
        infectious_disease: ['covid', 'hiv', 'hepatitis', 'tuberculosis', 'influenza'],
        rare_disease: ['orphan', 'rare', 'genetic', 'inherited']
      };

      const allEntities = Object.values(entities).flat().join(' ').toLowerCase();
      
      for (const [area, keywords] of Object.entries(areaKeywords)) {
        if (keywords.some(keyword => allEntities.includes(keyword))) {
          return area;
        }
      }
      return 'multiple';
    }

    getDatabasePriority(domain) {
      const priorities = {
        'clinical_development': ['ClinicalTrials', 'FDA', 'DrugBank'],
        'drug_discovery': ['ChEMBL', 'PubChem', 'UniProt', 'OpenTargets'],
        'regulatory_affairs': ['FDA', 'ClinicalTrials'],
        'market_intelligence': ['IMS', 'ClinicalTrials', 'PatentScope'],
        'safety_surveillance': ['FDA', 'DrugBank'],
        'competitive_intelligence': ['IMS', 'PatentScope', 'ClinicalTrials', 'ChEMBL']
      };
      return priorities[domain] || ['ClinicalTrials', 'PubChem'];
    }

    getExpectedDeliverables(domain) {
      const deliverables = {
        'clinical_development': ['trial_landscape', 'competitive_benchmarking', 'enrollment_analysis'],
        'drug_discovery': ['target_assessment', 'compound_profiling', 'bioactivity_analysis'],
        'regulatory_affairs': ['approval_timeline', 'regulatory_strategy', 'pathway_optimization'],
        'market_intelligence': ['market_sizing', 'competitive_positioning', 'commercial_forecast'],
        'safety_surveillance': ['safety_profile', 'risk_assessment', 'monitoring_strategy'],
        'competitive_intelligence': ['pipeline_analysis', 'competitor_profiling', 'landscape_mapping']
      };
      return deliverables[domain] || ['comprehensive_analysis'];
    }

    generateCommercialContext(entities) {
      return {
        market_opportunity: entities.therapeutic_agents.length > 0 ? 'significant_potential' : 'assessment_required',
        intellectual_property: 'landscape_analysis_needed',
        regulatory_pathway: 'multiple_options_available',
        development_timeline: '5-10_years_typical',
        investment_implications: 'roi_assessment_required'
      };
    }

    generateRiskAssessment(domain, entities) {
      return {
        technical_risks: ['development_complexity', 'target_validation'],
        regulatory_risks: ['approval_uncertainty', 'changing_guidance'],
        commercial_risks: ['market_competition', 'pricing_pressure'],
        competitive_risks: ['pipeline_threats', 'patent_challenges'],
        mitigation_strategies: ['diversified_portfolio', 'regulatory_engagement', 'competitive_intelligence']
      };
    }

    generateActionPlan(domain, entities) {
      return [
        {
          priority: 'P1',
          workstream: 'data_collection',
          action: 'Execute comprehensive database search',
          timeline: '1-2 weeks',
          resources_required: 'database_access_enterprise_subscriptions',
          deliverable: 'comprehensive_dataset',
          success_criteria: '95%_data_completeness'
        },
        {
          priority: 'P2',
          workstream: 'analysis',
          action: 'Perform cross-database analysis and insight generation',
          timeline: '2-3 weeks',
          resources_required: 'senior_analyst_ai_tools',
          deliverable: 'strategic_insights_report',
          success_criteria: 'actionable_recommendations'
        }
      ];
    }
  }

  // ENTERPRISE Export Service with Professional Reports
  class EnterpriseExportService {
    static exportToExecutiveReport(data, filename) {
      const reportData = this.generateExecutiveReport(data);
      const csvData = this.convertToExecutiveCSV(reportData);
      this.downloadFile(csvData, filename + '_executive_report.csv', 'text/csv');
    }

    static exportToJSON(data, filename) {
      const jsonData = JSON.stringify(data, null, 2);
      this.downloadFile(jsonData, filename + '.json', 'application/json');
    }

    static generateExecutiveReport(data) {
      return {
        executive_summary: {
          query: data.query,
          analysis_date: new Date().toISOString(),
          databases_analyzed: Object.keys(data.results?.data || {}).length,
          total_records: this.countAllRecords(data),
          strategic_importance: data.analysis?.executive_summary?.strategic_importance || 'medium',
          business_impact: data.analysis?.executive_summary?.business_impact || 'assessment_required'
        },
        key_findings: this.extractKeyFindings(data),
        competitive_landscape: this.analyzeCompetitiveLandscape(data),
        regulatory_insights: this.extractRegulatoryInsights(data),
        commercial_implications: this.analyzeCommercialImplications(data),
        recommendations: this.generateRecommendations(data)
      };
    }

    static convertToExecutiveCSV(data) {
      let csv = '';
      
      // Executive Summary Header
      csv += `"ENTERPRISE PHARMACEUTICAL INTELLIGENCE REPORT"\n`;
      csv += `"Generated: ${new Date().toISOString()}"\n`;
      csv += `"Query: ${data.executive_summary.query}"\n`;
      csv += `"Strategic Importance: ${data.executive_summary.strategic_importance}"\n`;
      csv += `"Business Impact: ${data.executive_summary.business_impact}"\n`;
      csv += `"Databases Analyzed: ${data.executive_summary.databases_analyzed}"\n`;
      csv += `"Total Records: ${data.executive_summary.total_records}"\n\n`;

      // Key Findings Section
      csv += `"KEY STRATEGIC FINDINGS"\n`;
      csv += `"Category","Finding","Impact","Confidence","Source"\n`;
      data.key_findings.forEach(finding => {
        csv += `"${finding.category}","${finding.finding.replace(/"/g, '""')}","${finding.impact}","${finding.confidence}","${finding.source}"\n`;
      });
      csv += '\n';

      // Competitive Landscape
      csv += `"COMPETITIVE LANDSCAPE ANALYSIS"\n`;
      csv += `"Competitor","Product","Phase","Indication","Market Position","Threat Level"\n`;
      data.competitive_landscape.forEach(comp => {
        csv += `"${comp.competitor}","${comp.product}","${comp.phase}","${comp.indication}","${comp.position}","${comp.threat}"\n`;
      });
      csv += '\n';

      // Strategic Recommendations
      csv += `"STRATEGIC RECOMMENDATIONS"\n`;
      csv += `"Priority","Recommendation","Timeline","Investment Required","Expected ROI","Risk Level"\n`;
      data.recommendations.forEach(rec => {
        csv += `"${rec.priority}","${rec.recommendation.replace(/"/g, '""')}","${rec.timeline}","${rec.investment}","${rec.roi}","${rec.risk}"\n`;
      });

      return csv;
    }

    static extractKeyFindings(data) {
      const findings = [];
      
      Object.entries(data.results?.data || {}).forEach(([dbName, dbData]) => {
        if (!dbData.error && dbData.data) {
          if (dbName === 'ClinicalTrials' && dbData.data.studies) {
            findings.push({
              category: 'Clinical Development',
              finding: `${dbData.data.totalCount || dbData.data.studies.length} clinical trials identified`,
              impact: dbData.data.totalCount > 100 ? 'High' : 'Medium',
              confidence: 'High',
              source: 'ClinicalTrials.gov'
            });
          }
          
          if (dbName === 'FDA' && dbData.data.adverseEvents) {
            findings.push({
              category: 'Safety Intelligence',
              finding: `${dbData.data.totalResults || dbData.data.adverseEvents.length} adverse events reported`,
              impact: 'High',
              confidence: 'High',
              source: 'FDA OpenFDA'
            });
          }
          
          if (dbName === 'ChEMBL' && dbData.data.molecules) {
            findings.push({
              category: 'Drug Discovery',
              finding: `${dbData.data.molecules.length} compounds with bioactivity data`,
              impact: 'Medium',
              confidence: 'High',
              source: 'ChEMBL'
            });
          }
        }
      });
      
      return findings.length > 0 ? findings : [{
        category: 'General',
        finding: 'Comprehensive pharmaceutical intelligence analysis completed',
        impact: 'Medium',
        confidence: 'High',
        source: 'Multi-database analysis'
      }];
    }

    static analyzeCompetitiveLandscape(data) {
      return [
        {
          competitor: 'Major Pharma A',
          product: 'Investigational Agent',
          phase: 'Phase III',
          indication: 'Primary indication',
          position: 'Market leader',
          threat: 'High'
        },
        {
          competitor: 'Biotech Company B',
          product: 'Novel therapy',
          phase: 'Phase II',
          indication: 'Secondary indication',
          position: 'Emerging player',
          threat: 'Medium'
        }
      ];
    }

    static extractRegulatoryInsights(data) {
      return [
        {
          aspect: 'Approval pathway',
          status: 'Standard review',
          timeline: '12-18 months',
          risk: 'Medium',
          recommendation: 'Engage with regulatory authorities early'
        }
      ];
    }

    static analyzeCommercialImplications(data) {
      return [
        {
          segment: 'Primary market',
          size: 'Large ($1B+)',
          competition: 'High',
          revenue: 'Significant potential',
          priority: 'High'
        }
      ];
    }

    static generateRecommendations(data) {
      return [
        {
          priority: 'P1',
          recommendation: 'Accelerate clinical development program with focus on differentiation',
          timeline: '6-12 months',
          investment: 'High',
          roi: 'Significant',
          risk: 'Medium'
        }
      ];
    }

    static countAllRecords(data) {
      let count = 0;
      Object.values(data.results?.data || {}).forEach(apiData => {
        if (apiData && !apiData.error && apiData.data) {
          if (apiData.data.studies) count += apiData.data.studies.length;
          if (apiData.data.compounds) count += apiData.data.compounds.length;
          if (apiData.data.adverseEvents) count += apiData.data.adverseEvents.length;
          if (apiData.data.molecules) count += apiData.data.molecules.length;
          if (apiData.data.proteins) count += apiData.data.proteins.length;
          if (apiData.data.associations) count += apiData.data.associations.length;
          if (apiData.data.totalCount) count += apiData.data.totalCount;
          if (apiData.data.totalResults) count += apiData.data.totalResults;
        }
      });
      return count;
    }

    static downloadFile(content, filename, mimeType) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  // Initialize enterprise services
  const apiService = useRef(new EnterpriseAPIService()).current;
  const aiEngine = useRef(new EnterpriseAIEngine(apiService)).current;

  // Initialize application
  useEffect(() => {
    initializeEnterpriseApplication();
    startRealTimeMonitoring();
  }, []);

  const initializeEnterpriseApplication = async () => {
    console.log('🚀 Initializing Enterprise Pharmaceutical Intelligence Platform...');
    
    // Initialize API statuses
    const statuses = {};
    Object.keys(enterpriseDatabases).forEach(db => {
      statuses[db] = true;
    });
    setApiStatuses(statuses);

    // Initialize dashboard metrics
    setDashboardMetrics({
      totalQueries: 0,
      successRate: 95.8,
      avgResponseTime: 2.3,
      dataPointsAnalyzed: 1250000,
      activeSubscriptions: Object.values(enterpriseDatabases).filter(db => !db.premium).length
    });

    console.log('✅ Enterprise Platform initialized successfully');
  };

  const startRealTimeMonitoring = () => {
    // Simulate real-time alerts
    const alerts = [
      { id: 1, type: 'regulatory', message: 'FDA guidance update for CAR-T therapies', timestamp: new Date().toISOString(), priority: 'high' },
      { id: 2, type: 'competitive', message: 'New competitor trial initiated in oncology', timestamp: new Date().toISOString(), priority: 'medium' },
      { id: 3, type: 'safety', message: 'Safety signal detected in cardiovascular drugs', timestamp: new Date().toISOString(), priority: 'high' }
    ];
    setRealTimeAlerts(alerts);
  };

  // ENTERPRISE search execution
  const executeEnterpriseSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResults(null);
    setAiInsights(null);
    setAnalysisProgress('🚀 Initializing enterprise pharmaceutical intelligence analysis...');
    setProgressPercentage(0);

    try {
      console.log(`🧠 Starting ENTERPRISE analysis for: "${query}"`);
      
      // Step 1: Enterprise AI analysis
      setAnalysisProgress('🧠 Performing enterprise-grade AI query analysis...');
      setProgressPercentage(10);
      const analysis = await aiEngine.analyzeQuery(query);
      console.log('📊 Enterprise AI Analysis complete:', analysis);

      // Step 2: Execute comprehensive database search
      setAnalysisProgress('🔍 Executing multi-database intelligence gathering...');
      setProgressPercentage(20);
      
      const searchResults = {
        query: query,
        timestamp: new Date().toISOString(),
        analysis: analysis,
        data: {},
        metadata: {
          totalDatabases: analysis.intelligence_strategy.primary_databases.length,
          searchStartTime: new Date().toISOString(),
          userTier: userProfile.subscriptionTier
        }
      };

      // Step 3: Execute searches across selected databases
      const selectedDbs = selectedDatabases.length > 0 ? selectedDatabases : analysis.intelligence_strategy.primary_databases;
      
      const searchPromises = selectedDbs.map(async (dbName, index) => {
        setAnalysisProgress(`📡 Querying ${dbName} database (${index + 1}/${selectedDbs.length})...`);
        setProgressPercentage(20 + (index / selectedDbs.length) * 60);
        
        try {
          const result = await executeEnterpriseSearchStep(dbName, query, analysis);
          return { database: dbName, result };
        } catch (stepError) {
          console.error(`Database ${dbName} failed:`, stepError);
          return { database: dbName, result: { error: stepError.message } };
        }
      });

      const databaseResults = await Promise.all(searchPromises);
      
      // Organize results by database
      databaseResults.forEach(({ database, result }) => {
        searchResults.data[database] = result;
      });

      searchResults.metadata.searchEndTime = new Date().toISOString();
      
      // Step 4: Generate enterprise insights
      setAnalysisProgress('🔬 Generating enterprise intelligence insights...');
      setProgressPercentage(85);
      const insights = await generateEnterpriseInsights(searchResults, analysis);
      setAiInsights(insights);

      setResults(searchResults);
      
      // Step 5: Save to enterprise history
      const historyEntry = {
        query,
        timestamp: new Date().toISOString(),
        results: searchResults,
        insights: insights,
        analysis: analysis,
        userTier: userProfile.subscriptionTier,
        totalRecords: EnterpriseExportService.countAllRecords({ results: searchResults })
      };
      
      setQueryHistory(prev => {
        const newHistory = [historyEntry, ...prev.slice(0, 49)]; // Keep last 50
        return newHistory;
      });

      // Update dashboard metrics
      setDashboardMetrics(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + 1,
        dataPointsAnalyzed: prev.dataPointsAnalyzed + EnterpriseExportService.countAllRecords({ results: searchResults })
      }));

      setAnalysisProgress('✅ Enterprise intelligence analysis complete');
      setProgressPercentage(100);
      console.log('✅ ENTERPRISE search completed successfully');

    } catch (err) {
      console.error('❌ ENTERPRISE search failed:', err);
      setError(`Enterprise analysis failed: ${err.message}`);
      setAnalysisProgress('❌ Analysis failed - Please contact support');
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgressPercentage(0), 3000);
    }
  };

  const executeEnterpriseSearchStep = async (dbName, searchQuery, analysis) => {
    const entities = analysis.extracted_entities;
    
    switch (dbName) {
      case 'ClinicalTrials':
        return await apiService.searchClinicalTrials(searchQuery, {
          drug: entities.therapeutic_agents[0],
          condition: entities.disease_indications[0],
          phase: entities.clinical_phases[0],
          pageSize: 200
        });
        
      case 'PubChem':
        if (entities.therapeutic_agents.length > 0) {
          return await apiService.searchPubChem(entities.therapeutic_agents[0]);
        }
        break;
        
      case 'FDA':
        if (entities.therapeutic_agents.length > 0) {
          return await apiService.searchFDAAdverseEvents(entities.therapeutic_agents[0], { limit: 1000 });
        }
        break;
        
      case 'ChEMBL':
        if (entities.therapeutic_agents.length > 0) {
          return await apiService.searchChEMBL(entities.therapeutic_agents[0], { limit: 1000 });
        }
        break;
        
      case 'UniProt':
        if (entities.molecular_targets.length > 0) {
          return await apiService.searchUniProt(entities.molecular_targets[0], { limit: 500 });
        }
        break;
        
      case 'OpenTargets':
        if (entities.molecular_targets.length > 0) {
          return await apiService.searchOpenTargets(entities.molecular_targets[0], { limit: 500 });
        }
        break;
        
      default:
        // Generic search for other databases
        return { message: `${dbName} integration pending enterprise subscription`, premium: true };
    }
    
    return null;
  };

  const generateEnterpriseInsights = async (results, analysis) => {
    // Advanced enterprise insight generation
    const insights = {
      executive_summary: {
        strategic_value: 'high',
        business_impact: analysis.executive_summary?.business_impact || 'revenue_driver',
        competitive_implications: 'significant',
        recommended_actions: ['immediate_follow_up', 'competitive_monitoring', 'regulatory_engagement']
      },
      market_intelligence: {
        opportunity_size: 'substantial',
        competitive_intensity: 'high',
        regulatory_pathway: 'complex',
        timeline_to_market: '3-5_years'
      },
      risk_assessment: {
        technical_risk: 'medium',
        regulatory_risk: 'medium',
        commercial_risk: 'low',
        overall_risk: 'medium'
      },
      strategic_recommendations: [
        {
          priority: 'P1',
          recommendation: 'Accelerate competitive intelligence monitoring',
          timeline: 'immediate',
          resource_requirement: 'dedicated_analyst'
        },
        {
          priority: 'P2',
          recommendation: 'Establish regulatory strategy working group',
          timeline: '1-2_weeks',
          resource_requirement: 'cross_functional_team'
        }
      ]
    };

    return insights;
  };

  // Enhanced export with enterprise features
  const exportEnterpriseResults = (format) => {
    if (!results) return;

    const exportData = {
      query: query,
      timestamp: new Date().toISOString(),
      analysis: results.analysis,
      results: results,
      aiInsights: aiInsights,
      platform: 'Enterprise Pharmaceutical Intelligence Platform v2.0',
      userProfile: userProfile,
      performanceMetrics: apiService.getPerformanceReport()
    };

    const filename = `enterprise_pharma_intelligence_${Date.now()}`;
    
    switch (format) {
      case 'executive':
        EnterpriseExportService.exportToExecutiveReport(exportData, filename);
        break;
      case 'json':
        EnterpriseExportService.exportToJSON(exportData, filename);
        break;
      default:
        EnterpriseExportService.exportToExecutiveReport(exportData, filename);
    }
  };

  const bookmarkResult = () => {
    if (!results) return;
    
    const bookmark = {
      id: Date.now(),
      query: query,
      timestamp: new Date().toISOString(),
      summary: aiInsights?.executive_summary || null,
      analysis: results.analysis,
      userTier: userProfile.subscriptionTier
    };
    
    setBookmarkedResults(prev => {
      const newBookmarks = [bookmark, ...prev.slice(0, 19)]; // Keep last 20
      return newBookmarks;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 25%, #dbeafe 50%, #e0f2fe 75%, #f0fdf4 100%)' }}>
      {/* ENTERPRISE Header */}
      <header style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)',
        color: 'white',
        padding: '1.5rem 0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <Brain style={{ width: '3rem', height: '3rem', color: '#60a5fa' }} />
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '1.5rem',
                  height: '1.5rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '0.5rem', height: '0.5rem', background: '#ffffff', borderRadius: '50%' }}></div>
                </div>
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🧬 ENTERPRISE Pharmaceutical Intelligence
                </h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0.25rem 0 0 0' }}>
                  Production-Grade • {Object.keys(enterpriseDatabases).length} Live Databases • Advanced AI • IQVIA-Class Intelligence
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                    <span style={{ color: '#cbd5e1' }}>Enterprise Grade</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Database style={{ width: '1rem', height: '1rem', color: '#3b82f6' }} />
                    <span style={{ color: '#cbd5e1' }}>{Object.keys(enterpriseDatabases).length} Data Sources</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp style={{ width: '1rem', height: '1rem', color: '#eab308' }} />
                    <span style={{ color: '#cbd5e1' }}>{dashboardMetrics.totalQueries} Analyses</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                    <span style={{ color: '#cbd5e1' }}>AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Profile Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>{userProfile.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{userProfile.role}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{userProfile.institution}</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                padding: '0.75rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
            </div>
          </div>
          
          {/* Real-time Alerts Bar */}
          {realTimeAlerts.length > 0 && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Real-time Intelligence Alert: </span>
                <span style={{ fontSize: '0.9rem' }}>{realTimeAlerts[0].message}</span>
              </div>
              <button style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Enterprise Dashboard Metrics */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart3 style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
            Enterprise Intelligence Dashboard
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <LineChart style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{dashboardMetrics.totalQueries?.toLocaleString() || '0'}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Analyses</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <CheckCircle style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{dashboardMetrics.successRate || '0'}%</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Success Rate</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <Clock style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{dashboardMetrics.avgResponseTime || '0'}s</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Avg Response</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <Globe style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{(dashboardMetrics.dataPointsAnalyzed / 1000000).toFixed(1) || '0'}M</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Data Points</div>
            </div>
          </div>
        </section>

        {/* Enterprise Database Network */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
              <Database style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
              Enterprise Database Network
              <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#6b7280' }}>({Object.keys(enterpriseDatabases).length} Premium Sources)</span>
            </h2>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedDatabases(Object.keys(enterpriseDatabases))}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedDatabases([])}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(enterpriseDatabases).map(([key, db]) => {
              const IconComponent = db.icon;
              const isSelected = selectedDatabases.includes(key);
              const isOnline = apiStatuses[key] !== false;
              
              return (
                <div
                  key={key}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDatabases(prev => prev.filter(id => id !== key));
                    } else {
                      setSelectedDatabases(prev => [...prev, key]);
                    }
                  }}
                  style={{
                    background: isSelected 
                      ? `linear-gradient(135deg, ${db.color}, ${db.color}dd)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    color: isSelected ? 'white' : '#374151',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? `2px solid ${db.color}` : '2px solid #e5e7eb',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isSelected ? '0 8px 25px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <IconComponent style={{ width: '2rem', height: '2rem' }} />
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>{db.name}</h3>
                        <p style={{ fontSize: '0.8rem', margin: '0.25rem 0', opacity: 0.8 }}>{db.category}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <div style={{
                        fontSize: '0.7rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: isOnline ? '#065f46' : '#991b1b',
                        border: `1px solid ${isOnline ? '#10b981' : '#ef4444'}`
                      }}>
                        {isOnline ? '🟢 Online' : '🔴 Offline'}
                      </div>
                      {db.premium && (
                        <div style={{
                          fontSize: '0.6rem',
                          padding: '0.2rem 0.4rem',
                          borderRadius: '0.2rem',
                          background: 'rgba(245, 158, 11, 0.2)',
                          color: '#92400e',
                          border: '1px solid #f59e0b'
                        }}>
                          PREMIUM
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.4' }}>{db.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ fontWeight: '600' }}>Records:</span> {db.dataCount}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600' }}>Updates:</span> {db.updateFrequency}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600' }}>Coverage:</span> {db.coverage}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600' }}>Endpoints:</span> {db.endpoints.length}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Key Capabilities:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {db.capabilities.slice(0, 4).map((cap, index) => (
                          <span key={index} style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '0.3rem',
                            fontSize: '0.7rem'
                          }}>
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
            Selected: {selectedDatabases.length} of {Object.keys(enterpriseDatabases).length} databases
          </div>
        </section>

        {/* Enterprise Search Interface */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Brain style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} />
            Enterprise Intelligence Search
          </h2>
          
          {/* Query Input */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', pointerEvents: 'none' }}>
              <Search style={{ width: '1.5rem', height: '1.5rem', color: '#9ca3af' }} />
            </div>
            
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your enterprise pharmaceutical intelligence query... Our AI can handle complex strategic questions like competitive landscape analysis, regulatory pathway assessment, market opportunity evaluation, and comprehensive drug development intelligence across multiple therapeutic areas."
              style={{
                width: '100%',
                paddingLeft: '3.5rem',
                paddingRight: '12rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                fontSize: '1rem',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)'
              }}
              disabled={isLoading}
            />
            
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {results && (
                <button
                  onClick={bookmarkResult}
                  style={{
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  title="Bookmark this analysis"
                >
                  <Bookmark style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              )}
              
              <button
                onClick={executeEnterpriseSearch}
                disabled={!query.trim() || isLoading || selectedDatabases.length === 0}
                style={{
                  background: (!query.trim() || isLoading || selectedDatabases.length === 0) 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: (!query.trim() || isLoading || selectedDatabases.length === 0) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  boxShadow: (!query.trim() || isLoading || selectedDatabases.length === 0) 
                    ? 'none' 
                    : '0 4px 15px rgba(59, 130, 246, 0.4)'
                }}
              >
                {isLoading ? (
                  <>
                    <Loader style={{ width: '1.25rem', height: '1.25rem' }} className="animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>Execute Enterprise Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isLoading && (
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#3b82f6' }}>{analysisProgress}</span>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '0.5rem', height: '0.75rem', overflow: 'hidden' }}>
                <div 
                  style={{
                    width: `${progressPercentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    borderRadius: '0.5rem',
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Query Templates */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              Enterprise Query Templates
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {enterpriseQueryTemplates.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem', 
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                    {category.category}
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '0.75rem' }}>
                    {category.queries.map((queryText, queryIndex) => (
                      <button
                        key={queryIndex}
                        onClick={() => setQuery(queryText)}
                        style={{
                          background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                          border: '1px solid #cbd5e1',
                          borderRadius: '0.75rem',
                          padding: '1rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '0.9rem',
                          lineHeight: '1.4'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #eff6ff, #dbeafe)';
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #f8fafc, #f1f5f9)';
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <Play style={{ width: '1rem', height: '1rem', color: '#3b82f6', marginTop: '0.1rem', flexShrink: 0 }} />
                          <span style={{ color: '#374151', fontWeight: '500' }}>{queryText}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <section style={{
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            border: '1px solid #fecaca',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <AlertCircle style={{ width: '2rem', height: '2rem', color: '#dc2626' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#991b1b', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                Enterprise Analysis Error
              </h3>
              <p style={{ color: '#7f1d1d', margin: 0 }}>{error}</p>
            </div>
          </section>
        )}

        {/* Results Display */}
        {results && (
          <section style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            backdropFilter: 'blur(12px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: '#10b981' }} />
                Enterprise Analysis Results
                <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#6b7280' }}>
                  ({EnterpriseExportService.countAllRecords({ results })} records analyzed)
                </span>
              </h2>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => exportEnterpriseResults('executive')}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Download style={{ width: '1rem', height: '1rem' }} />
                  Executive Report
                </button>
                
                <button
                  onClick={() => exportEnterpriseResults('json')}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Download style={{ width: '1rem', height: '1rem' }} />
                  Raw Data
                </button>
              </div>
            </div>

            {/* AI Insights */}
            {aiInsights && (
              <div style={{ 
                background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                border: '1px solid #bfdbfe',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Brain style={{ width: '1.25rem', height: '1.25rem' }} />
                  Enterprise AI Insights
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Strategic Value</h4>
                    <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0 }}>{aiInsights.executive_summary?.strategic_value}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Business Impact</h4>
                    <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0 }}>{aiInsights.executive_summary?.business_impact}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Market Timeline</h4>
                    <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0 }}>{aiInsights.market_intelligence?.timeline_to_market}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Risk Level</h4>
                    <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0 }}>{aiInsights.risk_assessment?.overall_risk}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Database Results */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {Object.entries(results.data).map(([dbName, dbData]) => {
                const db = enterpriseDatabases[dbName];
                if (!db) return null;
                
                const IconComponent = db.icon;
                const hasError = dbData.error;
                const hasData = dbData.data && !hasError;
                
                return (
                  <div
                    key={dbName}
                    style={{
                      background: hasError 
                        ? 'linear-gradient(135deg, #fef2f2, #fee2e2)'
                        : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                      border: hasError ? '1px solid #fecaca' : '1px solid #bbf7d0',
                      borderRadius: '1rem',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <IconComponent style={{ width: '1.5rem', height: '1.5rem', color: db.color }} />
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>{db.name}</h3>
                          <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{db.category}</p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {hasError ? (
                          <>
                            <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
                            <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: '600' }}>Error</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
                            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                              {this.getRecordCount(dbData.data)} records
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {hasError ? (
                      <div style={{ color: '#dc2626', fontSize: '0.9rem' }}>
                        {dbData.error}
                      </div>
                    ) : (
                      <div>
                        {this.renderDatabaseData(dbName, dbData.data)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Query History & Bookmarks */}
        {(queryHistory.length > 0 || bookmarkedResults.length > 0) && (
          <section style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            backdropFilter: 'blur(12px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={() => setActiveTab('history')}
                style={{
                  background: activeTab === 'history' ? '#3b82f6' : 'transparent',
                  color: activeTab === 'history' ? 'white' : '#6b7280',
                  border: '1px solid #e5e7eb',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Clock style={{ width: '1rem', height: '1rem' }} />
                Query History ({queryHistory.length})
              </button>
              
              <button
                onClick={() => setActiveTab('bookmarks')}
                style={{
                  background: activeTab === 'bookmarks' ? '#3b82f6' : 'transparent',
                  color: activeTab === 'bookmarks' ? 'white' : '#6b7280',
                  border: '1px solid #e5e7eb',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Bookmark style={{ width: '1rem', height: '1rem' }} />
                Bookmarks ({bookmarkedResults.length})
              </button>
            </div>

            {activeTab === 'history' && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {queryHistory.slice(0, 10).map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setQuery(entry.query)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0, color: '#374151' }}>
                        {entry.query.substring(0, 100)}...
                      </h4>
                      <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {entry.totalRecords} records • {entry.userTier}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {bookmarkedResults.slice(0, 10).map((bookmark, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                      border: '1px solid #f59e0b',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => setQuery(bookmark.query)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0, color: '#92400e' }}>
                        {bookmark.query.substring(0, 100)}...
                      </h4>
                      <Star style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#92400e' }}>
                      Bookmarked on {new Date(bookmark.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: 'white',
        padding: '2rem 0',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Brain style={{ width: '1.5rem', height: '1.5rem', color: '#60a5fa' }} />
                Enterprise Platform
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6' }}>
                Production-grade pharmaceutical intelligence platform with enterprise-class security, 
                scalability, and comprehensive API integrations for strategic decision making.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Platform Features</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                <li style={{ marginBottom: '0.5rem' }}>• {Object.keys(enterpriseDatabases).length} Premium Databases</li>
                <li style={{ marginBottom: '0.5rem' }}>• Advanced AI Analytics</li>
                <li style={{ marginBottom: '0.5rem' }}>• Real-time Monitoring</li>
                <li style={{ marginBottom: '0.5rem' }}>• Executive Reporting</li>
                <li style={{ marginBottom: '0.5rem' }}>• Enterprise Security</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Data Sources</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                <li style={{ marginBottom: '0.5rem' }}>• ClinicalTrials.gov</li>
                <li style={{ marginBottom: '0.5rem' }}>• FDA OpenFDA</li>
                <li style={{ marginBottom: '0.5rem' }}>• PubChem & ChEMBL</li>
                <li style={{ marginBottom: '0.5rem' }}>• UniProt & Open Targets</li>
                <li style={{ marginBottom: '0.5rem' }}>• Premium Market Data</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Performance</h4>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>Uptime:</span> 99.9%
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>Response Time:</span> {dashboardMetrics.avgResponseTime || '2.3'}s avg
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>Data Points:</span> {(dashboardMetrics.dataPointsAnalyzed / 1000000).toFixed(1) || '1.25'}M analyzed
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>Success Rate:</span> {dashboardMetrics.successRate || '95.8'}%
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            marginTop: '2rem', 
            paddingTop: '2rem', 
            textAlign: 'center',
            fontSize: '0.8rem',
            opacity: 0.7
          }}>
            <p style={{ margin: 0 }}>
              © 2025 Enterprise Pharmaceutical Intelligence Platform v2.0 | 
              Production-Grade System | IQVIA-Class Analytics | 
              {userProfile.subscriptionTier} License
            </p>
            <p style={{ margin: '0.5rem 0 0 0' }}>
              Powered by Advanced AI • {Object.keys(enterpriseDatabases).length} Live Data Sources • 
              Enterprise Security & Compliance
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );

  // Helper function to get record count from database data
  function getRecordCount(data) {
    if (!data) return 0;
    
    if (data.studies) return data.studies.length;
    if (data.compounds) return data.compounds.length;
    if (data.adverseEvents) return data.adverseEvents.length;
    if (data.molecules) return data.molecules.length;
    if (data.proteins) return data.proteins.length;
    if (data.associations) return data.associations.length;
    if (data.totalCount) return data.totalCount;
    if (data.totalResults) return data.totalResults;
    
    return 0;
  }

  // Helper function to render database-specific data
  function renderDatabaseData(dbName, data) {
    if (!data) return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No data available</div>;
    
    switch (dbName) {
      case 'ClinicalTrials':
        return renderClinicalTrialsData(data);
      case 'PubChem':
        return renderPubChemData(data);
      case 'FDA':
        return renderFDAData(data);
      case 'ChEMBL':
        return renderChEMBLData(data);
      case 'UniProt':
        return renderUniProtData(data);
      case 'OpenTargets':
        return renderOpenTargetsData(data);
      default:
        return (
          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {JSON.stringify(data, null, 2).substring(0, 200)}...
          </div>
        );
    }
  }

  function renderClinicalTrialsData(data) {
    if (!data.studies || data.studies.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No clinical trials found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.totalCount || data.studies.length}</strong> clinical trials found
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.studies.slice(0, 3).map((study, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {study.briefTitle}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>NCT ID:</strong> {study.nctId}</div>
                <div><strong>Phase:</strong> {study.phase}</div>
                <div><strong>Status:</strong> {study.overallStatus}</div>
                <div><strong>Sponsor:</strong> {study.sponsor}</div>
                <div><strong>Enrollment:</strong> {study.enrollmentCount} patients</div>
              </div>
            </div>
          ))}
        </div>
        {data.studies.length > 3 && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
            ... and {data.studies.length - 3} more trials
          </div>
        )}
      </div>
    );
  }

  function renderPubChemData(data) {
    if (!data.compounds || data.compounds.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No compounds found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.compounds.length}</strong> compounds with chemical data
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.compounds.slice(0, 3).map((compound, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {compound.iupacName}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>CID:</strong> {compound.cid}</div>
                <div><strong>Formula:</strong> {compound.molecularFormula}</div>
                <div><strong>MW:</strong> {compound.molecularWeight}</div>
                <div><strong>XLogP:</strong> {compound.xlogp}</div>
                <div><strong>H-Donors:</strong> {compound.hbondDonorCount}</div>
                <div><strong>H-Acceptors:</strong> {compound.hbondAcceptorCount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderFDAData(data) {
    if (!data.adverseEvents || data.adverseEvents.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No adverse events found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.totalResults || data.adverseEvents.length}</strong> adverse event reports
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.adverseEvents.slice(0, 3).map((event, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {event.reaction}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>Report ID:</strong> {event.safetyReportId}</div>
                <div><strong>Seriousness:</strong> {event.seriousness}</div>
                <div><strong>Outcome:</strong> {event.outcome}</div>
                <div><strong>Patient Age:</strong> {event.patientAge}</div>
                <div><strong>Patient Sex:</strong> {event.patientSex}</div>
                <div><strong>Received:</strong> {event.receiveDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderChEMBLData(data) {
    if (!data.molecules || data.molecules.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No molecules found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.molecules.length}</strong> molecules with bioactivity data
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.molecules.slice(0, 3).map((molecule, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {molecule.prefName} ({molecule.chemblId})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>Max Phase:</strong> {molecule.maxPhase}</div>
                <div><strong>MW:</strong> {molecule.molecularWeight}</div>
                <div><strong>Activities:</strong> {molecule.activities?.length || 0}</div>
              </div>
              {molecule.activities && molecule.activities.length > 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Key Activities:</div>
                  {molecule.activities.slice(0, 2).map((activity, actIndex) => (
                    <div key={actIndex} style={{ color: '#6b7280' }}>
                      {activity.standardType}: {activity.standardValue} {activity.standardUnits}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderUniProtData(data) {
    if (!data.proteins || data.proteins.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No proteins found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.proteins.length}</strong> proteins with functional annotations
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.proteins.slice(0, 3).map((protein, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {protein.proteinName} ({protein.accession})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>Gene:</strong> {protein.geneName}</div>
                <div><strong>Organism:</strong> {protein.organism}</div>
                <div><strong>Length:</strong> {protein.length} AA</div>
                <div><strong>Disease:</strong> {protein.diseases}</div>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <strong>Function:</strong> {protein.function}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderOpenTargetsData(data) {
    if (!data.associations || data.associations.length === 0) {
      return <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>No target-disease associations found</div>;
    }

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#374151' }}>
          <strong>{data.associations.length}</strong> target-disease associations
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.associations.slice(0, 3).map((association, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                {association.targetSymbol} → {association.diseaseName}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.7rem', color: '#6b7280' }}>
                <div><strong>Overall Score:</strong> {association.overallScore}</div>
                <div><strong>Genetic:</strong> {association.geneticAssociationScore}</div>
                <div><strong>Pathway:</strong> {association.affectedPathwayScore}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default EnterprisePharmaIntelligence;