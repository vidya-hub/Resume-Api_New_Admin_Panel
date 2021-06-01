var express = require('express');
var router = express.Router();
var multer = require('multer');
var crypto = require("crypto-js");
var AES_KEY = '6fnhkgo71s0caeqma6ojjftu4n1m1d85';
var pdf = require('html-pdf');

var userModel = require("../models/user");


var main = require('../apis/main');
var jobTitle = require('../apis/jobtitle');
var accomplishments = require('../apis/accomplishments');
var affiliations = require('../apis/affiliations');
var certifications = require('../apis/certifications');
var degree = require('../apis/degree');
var fieldOfStudy = require('../apis/fieldOfStudy');
var jobDescription = require('../apis/jobDescription');
var skills = require('../apis/skills');
var summary = require('../apis/summary');
var resume = require('../apis/resume');
var template = require('../apis/template');

/*************************************************************************/
module.exports = router;
//basic
router.post('/api/login', main.fnLogin);
router.post('/api/test', main.fnTest);
router.post('/api/register', main.fnRegister);
router.post('/api/registerAdmin', main.fnAdminRegister);
router.post("/api/updateUserProfile", main.fnUpdateProfile);
router.post("/api/updateUserAdminProfile", main.fnUpdateAdminProfile);
router.post("/api/change_admin_password", main.fnChangeAdminPassword);
router.post("/api/get_admin_data", main.fnGetAdminProfile);
router.post("/api/get_all_users", main.fnGetAllUsersData);
router.post("/api/deleteAdminProfile", main.fnDeleteAdminProfile);
router.post('/api/login_with_linkedin', main.fnLoginWithLinkedin);
router.post('/api/login_with_google', main.fnLoginWithGoogle);
router.post('/api/add_resume', resume.fnAddResume);
router.post('/api/login_with_google', resume.fnAddResume);
router.get('/api/get_resumes', resume.fnGetDemoResumes);
router.get('/api/get_resume_with_filename', resume.fnGetDemoResumeFromFile);

router.post('/api/get_single_resume_data', resume.fnGetSingleResume);
router.post('/api/get_download_link', resume.fnDownloadResume);
router.get('/api/render', resume.renderFile);
router.post('/api/render', resume.renderFile);
router.post('/api/renderhtml', resume.renderHtmlStep);

router.post('/api/render_json_data', resume.fnConvertRenderHtmlToJson);
router.post('/api/get_pdf', resume.sendPdf);

router.post('/api/get_word_document', resume.sendWordDocument);

router.post('/api/search_objective', jobDescription.fnGetObjective);
router.get('/resume_template', template.fnOutputResume)
router.post('/api/add_multipal', jobTitle.fnAddMultipal)
    //open for all (sencetive data)

// open for users
// router.post('/api/*', fnAuthoriseToken(), main.fnAuthoriseToken);
router.post('/api/get_login_user_detail', main.fnGetLoginUserDetails);
router.post('/api/send_otp_to_email', main.fnForgotPasswordEmailSend);
router.post('/api/verify_otp_changepassword', main.fnVerifyOtpForForgotPassword);



router.post('/api/get_users_resumes', resume.fnGetResumeList);
router.post('/api/get_user_latest_resume', resume.fnGetLatestRes);
router.post('/api/get_all_user_resume', resume.fnGetAllUserResume);

router.post('/api/update_resume', resume.fnUpdateResume);
router.post('/api/update_resume_type', resume.fnUpdateResumeType);
router.post('/api/delete_resume', resume.fnDeleteResume);

router.post('/api/search_job_title', jobTitle.fnSearchJobTitle);
router.post('/api/search_accomplishments', accomplishments.fnSearchAccomplishments);
router.post('/api/search_affiliations', affiliations.fnSearchAffiliations);
router.post('/api/search_certifications', certifications.fnSearchCertifications);
router.post('/api/search_degree', degree.fnSearchDegree);
router.post('/api/search_fieldOfStudy', fieldOfStudy.fnSearchFieldOfStudy);
router.post('/api/search_jobDescription', jobDescription.fnGetJobAsPerJobTitle);
router.post('/api/search_skill', skills.fnSearchSkills);
router.post('/api/search_summary', summary.fnSearchSummary);

//only for admins
/******************job title *********************************/
router.post('/api/admin/add_job_title', jobTitle.fnAddJobTitle);
router.post('/api/admin/update_job_title', jobTitle.fnUpdateJobTite);
router.post('/api/admin/disable_job_title', jobTitle.fnDisableJobTitle);
router.post('/api/admin/enable_job_title', jobTitle.fnEnableJobTitle);
router.post('/api/admin/get_all_job_title', jobTitle.fnGetJobTitle);
router.post('/api/admin/get_all_job_title_with_summary', jobTitle.fnGetJobTitleWithSummary);
router.post('/api/admin/get_active_job_title', jobTitle.fnGetActiveJobTitle);
router.post('/api/admin/delete_job_title', jobTitle.fnDeleteJobTitle);
/****************** job title *********************************/
/******************Accomplishments*****************************/
router.post('/api/admin/add_accomplishments', accomplishments.fnAddAccomplishments);
router.post('/api/admin/update_accomplishments', accomplishments.fnUpdateAccomplishments);
router.post('/api/admin/disable_accomplishments', accomplishments.fnDisableAccomplishments);
router.post('/api/admin/enable_accomplishments', accomplishments.fnActiveAccomplishments);
router.post('/api/admin/get_all_accomplishments', accomplishments.fnGetAllAccomplishments);
router.post('/api/admin/get_active_accomplishments', accomplishments.fnGetActiveAccomplishments);
router.post('/api/admin/delete_accomplishments', accomplishments.fnDeleteAccomplishments);
/******************Accomplishments******************************/
/******************Affiliations*********************************/
router.post('/api/admin/add_affiliations', affiliations.fnAddAffiliations);
router.post('/api/admin/update_affiliations', affiliations.fnUpdateAffiliations);
router.post('/api/admin/disable_affiliations', affiliations.fnDisableAffiliations);
router.post('/api/admin/enable_affiliations', affiliations.fnActiveAffiliations);
router.post('/api/admin/get_all_affiliations', affiliations.fnGetAllAffiliations);
router.post('/api/admin/get_active_affiliations', affiliations.fnGetActiveAffiliations);
router.post('/api/admin/delete_affiliations', affiliations.fnDeleteAffiliations);
/******************Affiliations*********************************/
/******************Certifications*******************************/
router.post('/api/admin/add_certifications', certifications.fnAddCertifications);
router.post('/api/admin/update_certifications', certifications.fnUpdateCertifications);
router.post('/api/admin/disable_certifications', certifications.fnDisableCertifications);
router.post('/api/admin/enable_certifications', certifications.fnActiveCertifications);
router.post('/api/admin/get_all_certifications', certifications.fnGetAllCertifications);
router.post('/api/admin/get_active_certifications', certifications.fnGetActiveCertifications);
router.post('/api/admin/delete_certifications', certifications.fnDeleteCertifications);
/******************Certifications*******************************/
/******************Degree*******************************/
router.post('/api/admin/add_degree', degree.fnAddDegree);
router.post('/api/admin/update_degree', degree.fnUpdateDegree);
router.post('/api/admin/disable_degree', degree.fnDisableDegree);
router.post('/api/admin/enable_degree', degree.fnActiveDegree);
router.post('/api/admin/get_all_degree', degree.fnGetAllDegree);
router.post('/api/admin/get_active_degree', degree.fnGetActiveDegree);
router.post('/api/admin/delete_degree', degree.fnDeleteDegree);
/******************Degree*******************************/
/******************fieldOfStudy*******************************/
router.post('/api/admin/add_fieldOfStudy', fieldOfStudy.fnAddFieldOfStudy);
router.post('/api/admin/update_fieldOfStudy', fieldOfStudy.fnUpdateFieldOfStudy);
router.post('/api/admin/disable_fieldOfStudy', fieldOfStudy.fnDisableFieldOfStudy);
router.post('/api/admin/enable_fieldOfStudy', fieldOfStudy.fnActiveFieldOfStudy);
router.post('/api/admin/get_all_fieldOfStudy', fieldOfStudy.fnGetAllFieldOfStudy);
router.post('/api/admin/get_active_fieldOfStudy', fieldOfStudy.fnGetActiveFieldOfStudy);
router.post('/api/admin/delete_fieldOfStudy', fieldOfStudy.fnDeleteFieldOfStudy);
/******************fieldOfStudy*******************************/
/******************jobDescription*******************************/
router.post('/api/admin/add_jobDescription', jobDescription.fnAddJobDescription);
router.post('/api/admin/update_jobDescription', jobDescription.fnUpdateJobDescription);
router.post('/api/admin/disable_jobDescription', jobDescription.fnDisableJobDescription);
router.post('/api/admin/enable_jobDescription', jobDescription.fnEnableJobDescription);
router.post('/api/admin/get_all_jobDescription', jobDescription.fnGetJobDescription);
router.post('/api/admin/get_active_jobDescription', jobDescription.fnGetActiveJobDescription);
router.post('/api/admin/delete_jobDescription', jobDescription.fnDeleteJobDescription);
/******************jobDescription*******************************/
/***********************Skills**********************************/
router.post('/api/admin/add_skill', skills.fnAddSkills);
router.post('/api/admin/update_skill', skills.fnUpdateSkills);
router.post('/api/admin/disable_skill', skills.fnDisableSkills);
router.post('/api/admin/enable_skill', skills.fnActiveSkills);
router.post('/api/admin/get_all_skill', skills.fnGetAllSkills);
router.post('/api/admin/get_active_skill', skills.fnGetActiveSkills);
router.post('/api/admin/delete_skill', skills.fnDeleteSkills);
/***********************Skills**********************************/
/***********************Summary**********************************/
router.post('/api/admin/add_summary', summary.fnAddSummary);
router.post('/api/admin/update_summary', summary.fnUpdateSummary);
router.post('/api/admin/disable_summary', summary.fnDisableSummary);
router.post('/api/admin/enable_summary', summary.fnActiveSummary);
router.post('/api/admin/get_all_summary', summary.fnGetAllSummary);
router.post('/api/admin/get_active_summary', summary.fnGetActiveSummary);
router.post('/api/admin/delete_summary', summary.fnDeleteSummary);
/***********************Summary**********************************/
/**fnGetChildDataCount */
router.post('/api/admin/job_title_summary', main.fnGetChildDataCount);

/**fnGetChildDataCount */
function fnAuthoriseToken() {
    var response = {
        status: 'error',
        msg: "Unauthorised request."
    };
    return function(req, res, next) {
        var url = req.originalUrl;
        if (req.headers && req.headers.authorization) {
            var parts = req.headers.authorization.split(' ');
            if (parts && parts.length >= 2) {
                if (parts[0] === 'Bearer') {
                    var str = parts[1];
                    var data = crypto.AES.decrypt(str, AES_KEY).toString(crypto.enc.Utf8);
                    if (data) {
                        userModel.findById(data).exec(function(e1, userData) {
                            if (!e1) {
                                if (userData && userData._id) {
                                    req.session.userId = userData._id;
                                    req.session.name = userData.name;
                                    req.session.firstName = userData.firstName;
                                    req.session.lastName = userData.lastName;
                                    req.session.companyEmail = userData.companyEmail;
                                    req.session.personalEmail = userData.personalEmail;
                                    req.session.phone = userData.phone;
                                    req.session.userName = userData.userName;
                                    req.session.usertype = userData.usertype;
                                    req.session.status = userData.status;
                                    return next();
                                } else {
                                    res.json(response);
                                }


                            } else {
                                console.log('Server error --> fnAuthorise --> e1 --> ', e1);
                                return res.json(response);
                            }
                        })
                    } else {
                        console.log(1)
                        console.log('Server error --> fnAuthorise --> data missmatch --> 1 --> ');
                        return res.json(response);
                    }
                } else {
                    console.log(11)
                    console.log('Server error --> fnAuthorise ---> Bearer missmatch --> 11 --> ');
                    return res.json(response);
                }
            } else {
                console.log(111)
                console.log('Server error --> fnAuthorise --> parts and parts length missmatch --> 111 --> ');
                return res.json(response);
            }
        } else {
            console.log(1111)
            console.log('Server error --> fnAuthorise --> authorization does not exist on header --> 1111 --> ');
            return res.json(response);
        }
    }
}