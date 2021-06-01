var resumeModel = require("../models/resume");
const phantom = require('phantom');
var grabzit = require('grabzit');
var ejs = require('ejs')
var pdf = require('html-pdf');
const userModel = require("../models/user");
const fetch = require("node-fetch");
var crypto = require("crypto");
let path = require("path");
var ipval = require("../helper/ipaddress.js");
var http = require('http'),
    fs = require('fs'),
    url = require('url');
const { ipvalreturn } = require("../helper/ipaddress.js");
var ipaddress = ipval.ipvalreturn();
console.log(ipaddress);
module.exports.fnAddResume = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }

    try {
        var userId = req.body.userId;
        var firstName = req.body.firstName;
        var jobTitle = req.body.jobTitle;
        var jobTitleId = req.body.jobTitleId;
        var lastName = req.body.lastName;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var zipCode = req.body.zipCode;
        var phoneNo = req.body.phoneNo;
        var email = req.body.email;
        var expFlag = req.body.expFlag;
        var links = req.body.links;
        var additionalContacts = req.body.additionalContacts
        var professionalSummary = req.body.summary
        var skills = req.body.skills;
        var workHistory = req.body.workHistory;
        var education = req.body.education;
        var certifications = req.body.certifications;
        var accomplishments = req.body.accomplishments;
        var affiliations = req.body.affiliations;
        var additionalInformation = req.body.additionalInformation;
        var birthDate = req.body.birthDate;
        var resumeDate = parseInt(req.body.resumeDate);
        var resumeType = req.body.resumeType;
        var refrences = req.body.refrences;

        var environment = req.body.environment;
        var objectives = req.body.objectives;
        var additionalDetails = req.body.additionalDetails;


        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        firstName = (firstName && typeof firstName === 'string') ? firstName.trim() : null;
        jobTitle = (jobTitle && typeof jobTitle === 'string') ? jobTitle.trim() : null;
        lastName = (lastName && typeof lastName === 'string') ? lastName.trim() : null;
        phoneNo = (phoneNo && typeof phoneNo === 'string') ? phoneNo.trim() : null;
        birthDate = (birthDate && typeof birthDate === 'string') ? birthDate.trim() : null;
        email = (email && typeof email === 'string' && re.test(String(email).toLowerCase())) ? email.trim() : null;
        // console.log("expFlag",expFlag);
        // console.log("resumeType",resumeType);
        // console.log("email",email);
        // console.log("birthDate",birthDate);
        // console.log("phoneNo",phoneNo);
        console.log("jobTitle", jobTitle);
        // console.log("firstName",firstName);
        console.log("jobTitle", jobTitle);
        console.log("jobTitleId", jobTitleId);
        // console.log("additionalDetails",additionalDetails);
        if (firstName && jobTitle && phoneNo && birthDate && email && resumeType && expFlag) {
            var additionalContactsForVerify = additionalContacts && JSON.parse(additionalContacts) ? JSON.parse(additionalContacts) : [];
            console.log("additionalContacts :-", additionalContactsForVerify)

            if (additionalContactsForVerify && additionalContactsForVerify.length > 0) {
                additionalContacts = JSON.parse(additionalContacts)
                for (let index = 0; index < additionalContactsForVerify.length; index++) {
                    const element = additionalContactsForVerify[index];
                    if (!(element.key && element.value)) {
                        additionalContacts.splice(index, 1);
                    }
                }
            } else {
                additionalContacts = [];
            }
            console.log(additionalContacts)
            var summary = professionalSummary && JSON.parse(professionalSummary) ? JSON.parse(professionalSummary) : [];
            if (summary && summary.length > 0) {
                for (let index = 0; index < summary.length; index++) {
                    const element = summary[index];
                    if (!element) {
                        console.log(professionalSummary);
                        summary.splice(index, 1)
                    }
                }
            }
            console.log(summary)
            var tempSummary = "";
            if (summary && summary.length > 0) {
                for (let index = 0; index < summary.length; index++) {
                    tempSummary = tempSummary + " " + summary[index];

                }
            }

            var skillsForVerify = skills && JSON.parse(skills) ? JSON.parse(skills) : [];
            console.log("skills :-", skillsForVerify)

            if (skillsForVerify && skillsForVerify.length > 0) {
                skills = skillsForVerify
                for (let index = 0; index < skillsForVerify.length; index++) {
                    const element = skillsForVerify[index];
                    if (!element) {
                        skills.splice(index, 1)
                    }
                }
            } else {
                skills = []
            }




            console.log("workHistory :-", workHistory)
            let workHistoryForVerify = workHistory && JSON.parse(workHistory) ? JSON.parse(workHistory) : [];
            console.log(workHistoryForVerify);
            if (workHistoryForVerify && workHistoryForVerify.length > 0) {
                workHistory = JSON.parse(workHistory)

                for (let index = 0; index < workHistoryForVerify.length; index++) {
                    const element = workHistoryForVerify[index];
                    console.log(element.responsibility);

                    if (!(element.jobTitle && element.employer && element.country && element.city && element.state && element.startDate && (element.endDate || element.currentlyWorkHere))) {
                        workHistory.splice(index, 1)
                    }
                }
            } else {
                workHistory = []
            }

            let educationForVerify = education && JSON.parse(education) ? JSON.parse(education) : [];
            console.log("education :-", educationForVerify)

            if (educationForVerify && educationForVerify.length > 0) {
                education = JSON.parse(education)
                for (let index = 0; index < educationForVerify.length; index++) {
                    const element = educationForVerify[index];
                    if (!(element.schoolName &&
                            element.schoolLocation &&
                            element.degree &&
                            // element.state &&
                            element.fieldOfStudy &&
                            element.graduationMonth &&
                            element.graduationYear
                        )) {
                        education.splice(index, 1)
                    }
                }
            } else {
                education = []
            }

            var certificationsForVerify = certifications && JSON.parse(certifications) ? JSON.parse(certifications) : [];
            console.log("certifications :-", certificationsForVerify)

            if (certificationsForVerify && certificationsForVerify.length > 0) {
                certifications = JSON.parse(certifications)
                for (let index = 0; index < certificationsForVerify.length; index++) {
                    const element = certificationsForVerify[index];
                    if (!element) {
                        certifications.splice(index, 1)
                    }
                }
            } else {
                certifications = []
            }

            var accomplishmentsForVerify = accomplishments ? JSON.parse(accomplishments) : [];
            console.log("accomplishments :-", accomplishmentsForVerify)

            if (accomplishmentsForVerify && accomplishmentsForVerify.length > 0) {
                accomplishments = JSON.parse(accomplishments)
                for (let index = 0; index < accomplishmentsForVerify.length; index++) {
                    const element = accomplishmentsForVerify[index];
                    if (!element) {
                        accomplishments.splice(index, 1)
                    }
                }
            } else {
                accomplishments = []
            }

            var affiliationsForVerify = affiliations && JSON.parse(affiliations) ? JSON.parse(affiliations) : [];
            console.log("affiliations :-", affiliationsForVerify)

            if (affiliationsForVerify && affiliationsForVerify.length > 0) {
                affiliations = JSON.parse(affiliations)
                for (let index = 0; index < affiliationsForVerify.length; index++) {
                    const element = affiliationsForVerify[index];
                    if (!element) {
                        affiliations.splice(index, 1)
                    }
                }
            } else {
                affiliations = []
            }

            var additionalInformationForVerify = additionalInformation && JSON.parse(additionalInformation) ? JSON.parse(additionalInformation) : [];
            console.log("additionalInformation :-", additionalInformationForVerify)

            if (additionalInformationForVerify && additionalInformationForVerify.length > 0) {
                additionalInformation = JSON.parse(additionalInformation)
                for (let index = 0; index < additionalInformationForVerify.length; index++) {
                    const element = additionalInformationForVerify[index];
                    if (!(element.title && element.description)) {
                        additionalInformation.splice(index, 1)
                    }
                }
            } else {
                additionalInformation = []
            }
            var resumeData = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                jobTitle: jobTitle,
                jobTitleId: jobTitleId,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNo: phoneNo,
                email: email,
                links: links ? JSON.parse(links) : [],
                additionalContacts: additionalContacts,
                professionalSummary: tempSummary,
                skills: skills,
                expFlag: expFlag.toString(),
                workHistory: workHistory,
                education: education,
                certifications: certifications,
                accomplishments: accomplishments,
                affiliations: affiliations,
                additionalInformation: additionalInformation,
                birthDate: birthDate,
                resumeDate: resumeDate,
                resumeType: resumeType,
                refrences: refrences ? JSON.parse(refrences) : [],
                environment: environment ? JSON.parse(environment) : [],
                objectives: objectives ? JSON.parse(objectives) : [],
                additionalDetails: additionalDetails ? JSON.parse(additionalDetails) : [],
                summary: summary
            }

            resumeModel(resumeData).save({ lean: true }, function(e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Resume is created.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnAddResume --> e1', e1);
                    res.json(response);
                }
            })

        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnAddResume --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateResume = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }

    try {
        var resumeId = req.body.resumeId;
        var userId = req.body.userId;
        var firstName = req.body.firstName;
        var jobTitle = req.body.jobTitle;
        var jobTitleId = req.body.jobTitleId;

        var lastName = req.body.lastName;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var zipCode = req.body.zipCode;
        var phoneNo = req.body.phoneNo;
        var email = req.body.email;
        var expFlag = req.body.expFlag;
        var links = req.body.links;
        var additionalContacts = req.body.additionalContacts
        var professionalSummary = req.body.summary
        var skills = req.body.skills;
        var workHistory = req.body.workHistory;
        var education = req.body.education;
        var certifications = req.body.certifications;
        var accomplishments = req.body.accomplishments;
        var affiliations = req.body.affiliations;
        var additionalInformation = req.body.additionalInformation;
        var birthDate = req.body.birthDate;
        var resumeDate = parseInt(req.body.resumeDate);
        var resumeType = req.body.resumeType;
        var refrences = req.body.refrences;
        // console.log(additionalContacts)

        // var environment = req.body.environment;
        var objectives = req.body.objectives;
        // console.log(JSON.parse(objectives));

        var additionalDetails = req.body.additionalDetails;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        resumeId = (resumeId && typeof resumeId === 'string') ? resumeId.trim() : null;
        firstName = (firstName && typeof firstName === 'string') ? firstName.trim() : null;
        jobTitle = (jobTitle && typeof jobTitle === 'string') ? jobTitle.trim() : null;
        lastName = (lastName && typeof lastName === 'string') ? lastName.trim() : null;
        phoneNo = (phoneNo && typeof phoneNo === 'string') ? phoneNo.trim() : null;
        birthDate = (birthDate && typeof birthDate === 'string') ? birthDate.trim() : null;
        email = (email && typeof email === 'string' && re.test(String(email).toLowerCase())) ? email.trim() : null;

        console.log(resumeId);
        console.log(firstName)
        console.log(jobTitle);
        console.log(phoneNo)
        console.log(birthDate)
        console.log(email)
        console.log(resumeType);
        if (resumeId && firstName && jobTitle && phoneNo && birthDate && email && resumeType) {
            var additionalContactsForVerify = additionalContacts && JSON.parse(additionalContacts) ? JSON.parse(additionalContacts) : [];

            if (additionalContactsForVerify && additionalContactsForVerify.length > 0) {
                additionalContacts = JSON.parse(additionalContacts)
                for (let index = 0; index < additionalContactsForVerify.length; index++) {
                    const element = additionalContactsForVerify[index];
                    if (!(element.key && element.value)) {
                        additionalContacts.splice(index, 1)
                    }
                }
            } else {
                additionalContacts = []
            }

            var summary = professionalSummary && JSON.parse(professionalSummary) ? JSON.parse(professionalSummary) : [];
            if (summary && summary.length > 0) {
                for (let index = 0; index < summary.length; index++) {
                    const element = summary[index];
                    if (!element) {
                        professionalSummary.splice(index, 1)
                    }
                }
            }
            // console.log(summary)
            var tempSummary = "";
            if (summary && summary.length > 0) {
                for (let index = 0; index < summary.length; index++) {
                    tempSummary = tempSummary + " " + summary[index];

                }
            }

            var skillsForVerify = skills && JSON.parse(skills) ? JSON.parse(skills) : [];
            if (skillsForVerify && skillsForVerify.length > 0) {
                skills = skillsForVerify
                for (let index = 0; index < skillsForVerify.length; index++) {
                    const element = skillsForVerify[index];
                    if (!element) {
                        skills.splice(index, 1)
                    }
                }
            } else {
                skills = []
            }

            var workHistoryForVerify = workHistory && JSON.parse(workHistory) ? JSON.parse(workHistory) : [];
            console.log(workHistoryForVerify)

            if (workHistoryForVerify && workHistoryForVerify.length > 0) {
                workHistory = JSON.parse(workHistory)
                for (let index = 0; index < workHistoryForVerify.length; index++) {
                    const element = workHistoryForVerify[index];
                    if (!(element.jobTitle && element.employer && element.city && element.country && element.state && element.startDate && (element.endDate || element.currentlyWorkHere))) {
                        workHistory.splice(index, 1)
                    }
                }
            } else {
                workHistory = []
            }

            var educationForVerify = education && JSON.parse(education) ? JSON.parse(education) : [];
            if (educationForVerify && educationForVerify.length > 0) {
                education = JSON.parse(education)
                for (let index = 0; index < educationForVerify.length; index++) {
                    const element = educationForVerify[index];
                    if (!(element.schoolName &&
                            element.schoolLocation &&
                            element.degree &&
                            // element.state &&
                            element.fieldOfStudy &&
                            element.graduationMonth &&
                            element.graduationYear
                        )) {
                        education.splice(index, 1)
                    }
                }
            } else {
                education = []
            }

            var certificationsForVerify = certifications && JSON.parse(certifications) ? JSON.parse(certifications) : [];
            if (certificationsForVerify && certificationsForVerify.length > 0) {
                certifications = JSON.parse(certifications)
                for (let index = 0; index < certificationsForVerify.length; index++) {
                    const element = certificationsForVerify[index];
                    if (!element) {
                        certifications.splice(index, 1)
                    }
                }
            } else {
                certifications = []
            }

            var accomplishmentsForVerify = accomplishments ? JSON.parse(accomplishments) : [];
            if (accomplishmentsForVerify && accomplishmentsForVerify.length > 0) {
                accomplishments = JSON.parse(accomplishments)
                for (let index = 0; index < accomplishmentsForVerify.length; index++) {
                    const element = accomplishmentsForVerify[index];
                    if (!element) {
                        accomplishments.splice(index, 1)
                    }
                }
            } else {
                accomplishments = []
            }

            var affiliationsForVerify = affiliations && JSON.parse(affiliations) ? JSON.parse(affiliations) : [];
            if (affiliationsForVerify && affiliationsForVerify.length > 0) {
                affiliations = JSON.parse(affiliations)
                for (let index = 0; index < affiliationsForVerify.length; index++) {
                    const element = affiliationsForVerify[index];
                    if (!element) {
                        affiliations.splice(index, 1)
                    }
                }
            } else {
                affiliations = []
            }

            var additionalInformationForVerify = additionalInformation && JSON.parse(additionalInformation) ? JSON.parse(additionalInformation) : [];
            if (additionalInformationForVerify && additionalInformationForVerify.length > 0) {
                additionalInformation = JSON.parse(additionalInformation)
                for (let index = 0; index < additionalInformationForVerify.length; index++) {
                    const element = additionalInformationForVerify[index];
                    if (!(element.title && element.description)) {
                        additionalInformation.splice(index, 1)
                    }
                }
            } else {
                additionalInformation = []
            }


            var resumeData = {
                userId: userId,
                firstName: firstName,
                jobTitle: jobTitle,
                jobTitleId: jobTitleId,
                lastName: lastName,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNo: phoneNo,
                email: email,
                links: links ? JSON.parse(links) : [],
                additionalContacts: additionalContacts,
                professionalSummary: tempSummary,
                skills: skills,
                expFlag: expFlag.toString(),
                workHistory: workHistory,
                education: education,
                certifications: certifications,
                accomplishments: accomplishments,
                affiliations: affiliations,
                additionalInformation: additionalInformation,
                birthDate: birthDate,
                resumeDate: resumeDate,
                resumeType: resumeType,
                // environment: JSON.parse(environment),
                refrences: refrences ? JSON.parse(refrences) : [],
                objectives: objectives ? JSON.parse(objectives) : [],
                additionalDetails: JSON.parse(additionalDetails),
                summary: summary
            };

            resumeModel.findByIdAndUpdate(resumeId, resumeData, { new: true }, function(e1, result) {

                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Resume is updated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnUpdateResume --> e1', e1);
                    res.json(response);
                }
            })

        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnUpdateResume --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateResumeType = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var resumeId = req.body.resumeId;
        var resumeDate = req.body.resumeDate;
        var resumeType = req.body.resumeType;
        resumeId = (resumeId && typeof resumeId === 'string') ? resumeId.trim() : null;
        resumeDate = (resumeDate && typeof resumeDate === 'string') ? resumeDate.trim() : "";

        if (resumeId && resumeType) {
            resumeModel.findByIdAndUpdate(resumeId, { resumeType: resumeType, resumeDate: parseInt(resumeDate) }, { new: true }, function(e1, result) {
                if (!e1) {
                    console.log("result");
                    console.log("result");
                    var demoResumeArray = [
                        "resume1.PNG",
                        "resume2.PNG",
                        "resume3.PNG",
                        "resume4.PNG",
                        "resume6.PNG",
                        "resume7.PNG",
                        "resume8.PNG",

                    ]
                    result["thumbnil"] = demoResumeArray[result.resumeType];
                    console.log(result["thumbnil"]);
                    console.log(result.resumeType);
                    console.log(demoResumeArray[result.resumeType]);
                    if (result.resumeType == 1) {
                        result.thumbnil = "resume1.PNG";
                    }

                    if (result.resumeType == 2) {
                        result.thumbnil = "resume2.PNG";
                    }

                    if (result.resumeType == 3) {
                        result.thumbnil = "resume3.PNG";
                    }
                    if (result.resumeType == 4) {
                        result.thumbnil = "resume4.PNG";
                    }

                    if (result.resumeType == 5) {
                        result.thumbnil = "resume6.PNG";
                    }

                    if (result.resumeType == 6) {
                        result.thumbnil = "resume7.PNG";
                    }
                    if (result.resumeType == 7) {
                        result.thumbnil = "resume8.PNG";
                    }

                    response.status = 'success';
                    response.msg = 'Resume is updated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnUpdateResumeType --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateResume --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteResume = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }

    try {
        var resumeId = req.body.resumeId;
        resumeId = (resumeId && typeof resumeId === 'string') ? resumeId.trim() : null;
        console.log(resumeId);
        console.log(req.body.userId);

        if (resumeId) {
            resumeModel.remove({ _id: resumeId, userId: req.body.userId }, function(e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Resume is deleted.';
                    response.data = result,
                        res.json(response);
                } else {
                    console.log('Server error --> fnDeleteResume --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteResume --> e', e);
        res.json(response);
    }
}

module.exports.fnDownloadResume = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var resumeId = req.body.resumeId
        resumeId = (resumeId && typeof resumeId === 'string') ? resumeId.trim() : null;
        if (resumeId) {
            phantom.create().then(function(ph) {
                ph.createPage().then(function(page) {
                    page.open(ipaddress + "api/render/?id=" + resumeId).then(function(status) {
                        var path = 'public/id_' + new Date().getTime() + '.pdf'
                        page.property('paperSize', {
                            format: 'A4',
                            width: '595px',
                            border: '1cm',
                        }).then((result) => {
                            page.property('viewportSize', { width: 595 }).then(() => {
                                page.render(path).then(function() {
                                    console.log('Page Rendered');
                                    response.status = "success";
                                    response.msg = "";
                                    response.data = ipaddress + +path.split('public/')[path.split('public/').length - 1]
                                    ph.exit();
                                    res.json(response)

                                });
                            })
                        })
                    });
                });
            });
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteResume --> e', e);
        res.json(response);
    }
}

module.exports.fnGetSingleResume = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong try again after sometimes.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.resumeId;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            resumeModel.findOne({ _id: id, isDeleted: false }).populate('userId', '*').lean().exec(function(e1, result) {
                if (!e1) {
                    if (result && result._id) {
                        response.msg = "";
                        response.status = "success";
                        response.data = result;
                        res.json(response);
                    } else {
                        response.msg = "Record does not found";
                        res.json(response);

                    }
                } else {
                    console.log('Server error --> fnGetSingleResume --> e1', e1);
                    res.json(response);
                }
            });
        } else {
            response.msg = "Invalid parameter"
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnGetSingleResume --> e', e);
        res.json(response);
    }
}

module.exports.fnGetResumeList = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var userId = req.body.userId;
        resumeModel.find({ userId: userId }).lean().exec(function(e1, result) {
            if (!e1) {
                console.log(result);
                console.log(userId);
                var demoResumeArray = [
                    "resume1.PNG",
                    "resume2.PNG",
                    "resume3.PNG",
                    "resume4.PNG",
                    "resume6.PNG",
                    "resume7.PNG",
                    "resume8.PNG",
                ]
                if (result.length > 0) {
                    for (let index = 0; index < result.length; index++) {
                        result[index]['thumbnil'] = demoResumeArray[result[index].resumeType - 1];
                    }
                }

                response.status = 'success';
                response.msg = '';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnGetResumeList --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetResumeList --> e', e);
        res.json(response);
    }
}


module.exports.fnGetLatestRes = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var email = req.body.email;
        resumeModel.find({ email: email }).lean().exec(async function(e1, result) {
            if (!e1) {
                var resumes = result;
                var dateList = [];
                console.log(resumes.length);
                if (resumes.length > 0) {
                    resumes.forEach((resume) => { dateList.push(resume.resumeDate) });

                    if (dateList.some(date => date === null)) {
                        var id = resumes[0]._id;
                        // console.log(id);
                    } else {
                        var indexOfMaxValue = dateList.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
                        var id = resumes[indexOfMaxValue]._id;
                    };
                    console.log(id);
                    try {
                        var id = resumes[0]._id;
                        // if (id){
                        var renderedHtml = await retrieveLogs(ipaddress + '/api/render/?id=' + id);

                        const filePath = './' + "pdf/" + (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 10)).toUpperCase() + ".pdf";
                        pdf.create(renderedHtml).toFile(filePath, (error, out) => {
                            console.log(out)
                            if (out) {
                                fs.readFile(out.filename, function(err, content) {
                                    if (err) {
                                        res.writeHead(400, { 'Content-type': 'text/html' })
                                        console.log(err);
                                        res.end("No such file");
                                    } else {

                                        res.writeHead(200, {

                                            'Content-disposition': 'attachment;filename=' + filePath,
                                        });
                                        res.end(content);
                                    }
                                });
                                fs.unlink(out.filename, function(err) {
                                    if (err) throw err;
                                    console.log('file deleted');
                                });
                            }
                            if (error != null) {
                                console.log("Error");

                                throw error;
                            }
                        });


                        // } else {
                        //         response.msg = "Invalid Parameter";
                        //         res.json(response);
                        // }
                    } catch (e) {
                        console.log('Server error --> fnConvertPdfDoc --> e', e);
                        res.json(response);
                    }
                } else {
                    response.msg = "No Resumes";
                    res.json(response);
                }
                // for (var resume in resumes) {
                //         console.log(resume.resumeDate);
                // }
                // console.log(result.length);
            } else {
                console.log('Server error --> fnGetResumeList --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetResumeList --> e', e);
        res.json(response);
    }
}


module.exports.fnGetDemoResumes = (req, res, next) => {
    console.log("resume");

    var response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var resume = [
            // { resumeType: 1, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume1.PNG" },
            // { resumeType: 2, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume2.PNG" },
            // { resumeType: 3, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume3.PNG" },
            // { resumeType: 4, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume4.PNG" },
            // { resumeType: 5, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume5.PNG" },
            // { resumeType: 6, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume6.PNG" },
            // { resumeType: 7, thumbnil: ipaddress + "/api/get_resume_with_filename/?image=resume7.PNG" },
            { resumeType: 1, thumbnil: "resume1.PNG" },
            { resumeType: 2, thumbnil: "resume2.PNG" },
            { resumeType: 3, thumbnil: "resume3.PNG" },
            { resumeType: 4, thumbnil: "resume4.PNG" },
            { resumeType: 5, thumbnil: "resume6.PNG" },
            { resumeType: 6, thumbnil: "resume7.PNG" },
            { resumeType: 7, thumbnil: "resume8.PNG" },

        ];
        console.log(resume)
        response.msg = '';
        response.status = 'success';
        response.data = resume;
        res.json(response);
    } catch (e) {
        console.log('Server error --> fnGetDemoResume --> e', e);
        res.json(response);
    }
}

module.exports.fnGetDemoResumeFromFile = async(req, res, next) => {
    console.log(req.url);

    try {
        // res.json(response);
        var query = url.parse(req.url, true).query;
        pic = query.image;

        fs.readFile('./' + pic, function(err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' })
                console.log(err);
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, { 'Content-type': 'image/jpg' });
                res.end(content);
            }
        });
    } catch (e) {
        var response = {
            status: 'error',
            msg: "Something happened wrong try again after sometime.",
            data: {},
            method: req.url.split('/')[req.url.split('/').length - 1]
        }
        console.log('Server error --> fnGetDemoResumeFromFile --> e', e);
        res.json(response);

    }
}

module.exports.fnSendFiles = async(req, res, next) => {
    console.log(req.url);

    try {
        // res.json(response);
        var query = url.parse(req.url, true).query;
        doc = query.docfilename;

        fs.readFile('./' + doc, function(err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' })
                console.log(err);
                res.end("No such file");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, {
                    'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    'Content-disposition': 'attachment;filename=' + filename,
                });
                res.end(content);
            }
        });
    } catch (e) {
        var response = {
            status: 'error',
            msg: "Something happened wrong try again after sometime.",
            data: {},
            method: req.url.split('/')[req.url.split('/').length - 1]
        }
        console.log('Server error --> fnGetDemoResumeFromFile --> e', e);
        res.json(response);

    }
}

// module.exports.fnGetDemoResume = async (req, res, next) => {

// }



module.exports.renderFile = async(req, res, next) => {
    console.log(req.query.id)
    var id = req.query.id;
    var ejs = require('ejs')
    if (!id) {
        id = req.body.id;
    }
    try {
        var data = await resumeModel.findById(id)

    } catch (error) {
        console.log(error);
    }
    console.log(data);
    if (data.resumeType == 1) {
        ejs.renderFile('resume1.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });
    }

    if (data.resumeType == 2) {
        ejs.renderFile('resume3.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }
    if (data.resumeType == 3) {
        ejs.renderFile('resume4.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }
    if (data.resumeType == 4) {
        ejs.renderFile('resume5.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }
    if (data.resumeType == 5) {
        ejs.renderFile('resume6.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }
    if (data.resumeType == 6) {
        ejs.renderFile('resume7.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }
    if (data.resumeType == 7) {
        ejs.renderFile('resume8.ejs', data, {}, function(err, str) {
            res.end(ejs.render(str, {}, {}));
        });

    }

}



module.exports.renderHtmlStep = async(req, res, next) => {
    console.log("here");
    var query = url.parse(req.url, true).query;
    var id = query.id;
    var datavalues = req.body;
    if (id == "1") {
        var pathejs = path.join(__dirname, 'views/', 'resume1.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });
    }

    if (id == "2") {
        var pathejs = path.join(__dirname, 'views/', 'resume3.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });


    }
    if (id == "3") {
        var pathejs = path.join(__dirname, 'views/', 'resume4.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });

    }
    if (id == "4") {
        var pathejs = path.join(__dirname, 'views/', 'resume5.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });

    }
    if (id == "5") {
        var pathejs = path.join(__dirname, 'views/', 'resume6.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });
    }
    if (id == "6") {
        var pathejs = path.join(__dirname, 'views/', 'resume7.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });
    }
    if (id == "7") {
        var pathejs = path.join(__dirname, 'views/', 'resume8.ejs');
        ejs.renderFile(pathejs, datavalues, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(data.toString()));
            };
        });
    }

}




module.exports.fnConvertRenderHtmlToJson = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            var renderedHtml = await retrieveLogs(ipaddress + '/api/render/?id=' + id.trim());
            console.log(renderedHtml);
            response.data = renderedHtml;
            response.status = "success";
            response.msg = "";
            res.json(response);
        } else {
            response.msg = "Invalid Parameter";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnConvertRenderHtmlToJson --> e', e);
        res.json(response);
    }
}

module.exports.senpdf = async(req, res, next) => {
    var response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            var renderedHtml = await retrieveLogs(ipaddress + '/api/render/?id=' + id.trim());
            console.log(renderedHtml);
            response.data = renderedHtml;
            response.status = "success";
            response.msg = "";
            res.json(response);
        } else {
            response.msg = "Invalid Parameter";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnConvertRenderHtmlToJson --> e', e);
        res.json(response);
    }
}

module.exports.sendWordDocument = async(req, res, next) => {
    // var docfullname = "resume.docx";
    const docfullname = (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 10)).toUpperCase() + ".docx";

    console.log(docfullname);
    var response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            var renderedHtml = await retrieveLogs(ipaddress + '/api/render/?id=' + id.trim());
            // var client = new grabzit("MDUxM2U1ZjZhYzkxNGY0OWFmYjNjNWM0OGFjZGMyOWM=", "Pz8/P05OOz8/Pz8IPxA/Zz9UPz88LGY/IiA/FD8rJT8=");

            var client = new grabzit("MGIwZWZmMGFjOWJhNDVjNGIzNzBlNTk0NjY5ZTcyMmI=", "bGg/PzY/VT8/NT8/Pz9uPzc/Px8/PwQ/cj95NGw/Hz8=");
            // var client = new grabzit("MTAxOTIzZjU2MDkxNGEwZWFkNTBlZjI3NjU3MjExYWQ=", "Pz8zPz8BDD8/AgQ1P2BrVT95H1NZf0o/b00/Pz8/Pz8=");
            client.html_to_docx(renderedHtml);
            console.log("saved");
            try {


                client.save_to(docfullname, function(error, id) {
                    if (id == null) {
                        fs.readFile(docfullname, function(err, content) {
                            if (err) {
                                res.writeHead(400, { 'Content-type': 'text/html' })
                                console.log(err);
                                res.json(response);
                                console.log("error kind ")
                                res.end("No such file");
                            } else {
                                //specify the content type in the response will be an image
                                res.writeHead(200, {
                                    'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                    'Content-disposition': 'attachment;filename=' + docfullname,
                                });
                                res.end(content);
                            }
                        });
                        fs.unlink(docfullname, function(err) {
                            if (err) throw err;
                            console.log('file deleted');
                        });
                    };
                    if (error != null) {
                        console.log("Error");
                        res.end("No such file");

                        console.log('Server error --> fnConvertWordDoc --> e', error);
                        res.json(response);
                    }
                });
            } catch (failerror) {
                console.log('Server error --> fnConvertWordDoc --> e', failerror);
                res.json(response);
            }

        } else {
            response.msg = "Invalid Parameter";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnConvertWordDoc --> e', e);
        res.json(response);
    }
}
module.exports.sendPdf = async(req, res, next) => {
    console.log("here")
        // var docfullname = "resume.docx";
    const docfullname = (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 10)).toUpperCase() + ".pdf";

    console.log(docfullname);
    var response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            var renderedHtml = await retrieveLogs(ipaddress + '/api/render/?id=' + id.trim());

            const filePath = './' + "pdf/" + (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 10)).toUpperCase() + ".pdf";
            pdf.create(renderedHtml).toFile(filePath, (error, out) => {
                console.log(out)
                if (out) {
                    fs.readFile(out.filename, function(err, content) {
                        if (err) {
                            res.writeHead(400, { 'Content-type': 'text/html' })
                            console.log(err);
                            res.end("No such file");
                        } else {

                            res.writeHead(200, {

                                'Content-disposition': 'attachment;filename=' + filePath,
                            });
                            res.end(content);
                        }
                    });
                    fs.unlink(out.filename, function(err) {
                        if (err) throw err;
                        console.log('file deleted');
                    });
                }
                if (error != null) {
                    console.log("Error");

                    throw error;
                }
            });


        } else {
            response.msg = "Invalid Parameter";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnConvertPdfDoc --> e', e);
        res.json(response);
    }
}

module.exports.fnGetAllUserResume = async(req, res, next) => {
    let response = {
        status: 'error',
        msg: "Something happened wrong try again after sometime.",
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        // userModel.aggregate([{
        //     "$lookup": {
        //         "from": "resumeModel",
        //         "localField": "_id",
        //         "foreignField": "userId",
        //         "as": "resumeData1"
        //     },
        // }]).exec(function(e1, result) {
        //     //     resumeModel.find().lean().exec(function(e1, resu) {
        //     //         console.log(resu)
        //     //         if (!e1) {
        //     //             res.json(resu);
        //     //         } else {
        //     //             console.log('Server error --> fnLoginWithLinkedin --> e1', e1);
        //     //             res.json(response);
        //     //         }
        //     //     })
        //     console.log(result)
        //     if (!e1) {
        //         res.json(result);
        //     } else {
        //         console.log('Server error --> fnLoginWithLinkedin --> e1', e1);
        //         res.json(response);
        //     }

        // })
        resumeModel.find().lean().exec(function(e1, result) {
            console.log(result)
            if (!e1) {
                res.json({
                    status: "success",
                    data: result
                });
            } else {
                console.log('Server error --> fnLoginWithLinkedin --> e1', e1);
                res.json(response);
            }

        })
    } catch (e) {
        console.log('Server error --> fnConvertPdfDoc --> e', e);
        res.json(response);
    }
}

async function retrieveLogs(url) {
    return await fetch(url)
        .then(res => res.text())
}