const Joi = require("joi");

const userSchema = {
    name: Joi.string().min(2).max(128).required().label("Name"),
    email: Joi.string().email().min(4).label("E-mail"),
    password: Joi.string().label("Password"),
};

exports.validateUserData = (data) => {
    return ({ value, error } = Joi.object(userSchema).validate(data));
};

const profileSchema = {
    status: Joi.string().required().label("Status"),
    company: Joi.string().min(2).label("Company"),
    website: Joi.string().min(4).label("Website"),
    location: Joi.string().min(2).label("Location"),
    skills: Joi.array().required().items(Joi.string()).label("Skills"),
    githubUsername: Joi.string().label("Github username"),
    bio: Joi.string().max(256).label("Bio"),
    socialHandles: Joi.object({
        linkedin: Joi.string(),
        facebook: Joi.string(),
        github: Joi.string(),
        instagram: Joi.string(),
        twitter: Joi.string(),
        youtube: Joi.string(),
    }),
};

exports.validateProfileData = (data) => {
    return ({ value, error } = Joi.object(profileSchema).validate(data));
};

const profileExperienceSchema = {
    title: Joi.string().required().label("Title"),
    organization: Joi.string().required().label("Organization"),
    location: Joi.string().required().label("Location"),
    from: Joi.date().required().label("Starting date"),
    to: Joi.date().label("Ending date"),
    current: Joi.boolean().label("Current"),
    description: Joi.string().max(256).allow("").label("Description"),
};

exports.validateProfileExperienceData = (data) => {
    return ({ value, error } = Joi.object(profileExperienceSchema).validate(
        data
    ));
};

const profileEducationSchema = {
    school: Joi.string().required().label("School"),
    degree: Joi.string().required().label("Degree"),
    fieldOfStudy: Joi.string().required().label("Field of study"),
    location: Joi.string().required().label("Location"),
    from: Joi.date().required().label("Starting date"),
    to: Joi.date().label("Ending date"),
    current: Joi.boolean().label("Current"),
    description: Joi.string().max(256).allow("").label("Description"),
};

exports.validateProfileEducationData = (data) => {
    return ({ value, error } = Joi.object(profileEducationSchema).validate(
        data
    ));
};
