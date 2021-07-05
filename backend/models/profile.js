const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required!"],
        },
        location: {
            type: String,
            minLength: 2,
            trim: true,
        },
        company: {
            type: String,
            minLength: 2,
            trim: true,
        },
        website: {
            type: String,
            minLength: 4,
            trim: true,
        },
        status: {
            type: String,
            enum: [
                "Developer",
                "Junior Developer",
                "Senior Developer",
                "Manager",
                "Student",
                "Instructor",
                "Intern",
                "Other",
            ],
            require: [true, "status can not be left empty!"],
            trim: true,
        },
        skills: {
            type: [{ type: String, trim: true }],
            required: [true, "Please provide at least one skill!"],
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 256,
        },
        githubUsername: {
            type: String,
            trim: true,
        },
        experiences: {
            type: [
                {
                    title: {
                        type: String,
                        trim: true,
                        required: [true, "Please provide title!"],
                    },
                    organization: {
                        type: String,
                        trim: true,
                        required: [
                            true,
                            "Please provide organization/company!",
                        ],
                    },
                    location: {
                        type: String,
                        trim: true,
                        required: [
                            true,
                            "Please provide the address location!",
                        ],
                    },
                    from: {
                        type: Date,
                        required: [true, "Please provide starting date!"],
                    },
                    to: {
                        type: Date,
                    },
                    current: {
                        type: Boolean,
                        default: false,
                    },
                    description: {
                        type: String,
                        trim: true,
                        maxLength: 256,
                    },
                },
            ],
        },
        education: {
            type: [
                {
                    school: {
                        type: String,
                        trim: true,
                        required: [true, "Please provide school!"],
                    },
                    degree: {
                        type: String,
                        trim: true,
                        required: [true, "Please provide degree/diploma!"],
                    },
                    fieldOfStudy: {
                        type: String,
                        trim: true,
                        required: [true, "Please provide degree/diploma!"],
                    },
                    location: {
                        type: String,
                        trim: true,
                        required: [
                            true,
                            "Please provide the school/institute location!",
                        ],
                    },
                    from: {
                        type: Date,
                        required: [true, "Please provide starting date!"],
                    },
                    to: {
                        type: Date,
                    },
                    current: {
                        type: Boolean,
                        default: false,
                    },
                    description: {
                        type: String,
                        trim: true,
                        maxLength: 256,
                    },
                },
            ],
        },
        socialHandles: {
            linkedin: {
                type: String,
            },
            facebook: {
                type: String,
            },
            github: {
                type: String,
            },
            instagram: {
                type: String,
            },
            twitter: {
                type: String,
            },
            youtube: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
