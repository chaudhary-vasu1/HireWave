import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
try {
const { userContent } = req.body;

if(!userContent) {
return res.status(400).json({message: 'Missing required fields'})

}

 const response = await ai.chat.completions.create({
model: process.env.OPENAI_MODEL,
messages: [
{ role: "system", content: "You are a expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-friendly and only return text no options or anything else." },
{
role: "user",
content: userContent,
},
],
}
)
const enhancedContent = response.choices[0].message.content;
return res.status(200).json({enhancedContent});
}

catch(err){
  return res.status(400).json({message:err.message});
}
}

// enhance job description

export const enhanceJobDescription = async (req, res) => {
try {
const { userContent } = req.body;

if(!userContent) {
return res.status(400).json({message: 'Missing required fields'})

}

 const response = await ai.chat.completions.create({
model: process.env.OPENAI_MODEL,
messages: [
{ role: "system", content: "You are a expert in resume writing. Your task is to enhance the Job Description of a resume. The job Description should be 1-2 sentences also highlighting key responsibilities and achievements. Make it compelling and ATS-friendly and only return text no options or anything else." },
{
role: "user",
content: userContent,
},
],
}
)
const enhancedContent = response.choices[0].message.content;
return res.status(200).json({enhancedContent});
}

catch(err){
  return res.status(400).json({message:err.message});
}
}

// for uploding existing resume to database

export const uploadResume = async (req, res) => {
try {
    const {resumeText , title} = req.body;
    const userId = req.userId;

    if(!resumeText){
        return res.status(400).json({message:"missing required fields"});
    }
    const systemPrompt = "You are an expert AI agent to extract data from resume"
    const userPrompt = `extract data from this resume : ${resumeText} 
    provide data in the following JSON format with no additional text before or after:
    {
    professional_summary: { type: String, default: ''},
    skills: [{ type: String }],
    personal_info: {
        image: {type: String, default: '' },
        full_name: {type: String, default: '' },
        profession: {type: String, default: ' '},
        email: {type: String, default: ''},
        phone:{type:String , default:''},
        location:{type:String , default:''},
        linkedin:{type:String , default:''},
        website:{type:String , default:''}
    },

    experience: [
    {
        company: { type: String },
        position: { type: String },
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        is_current: { type: Boolean },
}
    ],
     projects: [
    {
        name: { type: String },
        type: { type: String },
        description: { type: String },
    }
    ],

     education: [
    {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gpa: { type: String },
        
}
    ],

    
    }
    
    `

 const response = await ai.chat.completions.create({
model: process.env.OPENAI_MODEL,
messages: [
{ role: "system", content: systemPrompt },
{
role: "user",
content: userPrompt,
},
],
response_format :{type:'json_object'}
}
)
const extractedData = response.choices[0].message.content;
const parsedData = JSON.parse(extractedData);
const newResume = await Resume.create({userId , title , ...parsedData})
return res.json({resumeId:newResume._id});
}

catch(err){
  return res.status(400).json({message:err.message});
}
}

// scan resume for ATS score & feedback
export const scanResumeATS = async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole } = req.body;

    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({ message: "Sufficient resume text is required for ATS scanning." });
    }

    const systemPrompt = `You are an elite Applicant Tracking System (ATS) auditor and hiring expert. Analyze the provided resume text against ATS standard scoring rules and optionally against the target job description or role if provided. Return ONLY a valid JSON object matching the requested schema. No conversational preamble.`;

    const userPrompt = `
Analyze this resume text and generate ATS feedback:

--- RESUME TEXT ---
${resumeText}

${targetRole ? `--- TARGET ROLE ---\n${targetRole}` : ""}
${jobDescription ? `--- TARGET JOB DESCRIPTION ---\n${jobDescription}` : ""}

Return a JSON object in EXACTLY this format:
{
  "overallScore": 85,
  "categoryScores": {
    "formatting": 88,
    "keywords": 82,
    "experienceImpact": 80,
    "skillsMatch": 86
  },
  "summary": "2-3 sentence overview of ATS compatibility and quality.",
  "strengths": [
    "Strength point 1",
    "Strength point 2",
    "Strength point 3"
  ],
  "missingKeywords": [
    "Missing Keyword 1",
    "Missing Keyword 2",
    "Missing Keyword 3",
    "Missing Keyword 4"
  ],
  "improvements": [
    "Actionable tip 1",
    "Actionable tip 2",
    "Actionable tip 3"
  ]
}
`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const resultText = response.choices[0].message.content;
    const scanResult = JSON.parse(resultText);

    return res.status(200).json({ scanResult });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
