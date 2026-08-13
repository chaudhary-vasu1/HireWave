import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId , ref:"User"},
    title:{type:String , default:'Untitled Resume'},
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
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
        github:{type:String , default:''},
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
        title: { type: String },
        type: { type: String },
        techStack: { type: String },
        link: { type: String },
        website: { type: String },
        github: { type: String },
        github_link: { type: String },
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

     certifications: [
    {
        title: { type: String, default: '' },
        issuer: { type: String, default: '' },
        year: { type: String, default: '' }
    }
    ],
     achievements: [{ type: String }],
     languages: [{ type: String }],
     sections_order: {
        type: [{ type: String }],
        default: ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements', 'languages']
     },
     hidden_sections: [{ type: String }]

},{timestamps:true , minimize:false} )

const Resume = mongoose.model('Resume' , ResumeSchema);
export default Resume;