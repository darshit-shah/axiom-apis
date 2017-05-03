/**
 * Axiom-apis module.
 * @module axiom-apis
 * @see www.npmjs.com/package/axiom-apis
 */
var https = require('https');
module.exports = function() {


    /**
     * AxiomAPIs is wrapper library to call axiom APIs.
     * @type {Object}
     */
    var AxiomAPIs = {

        /**
         * url on which all axiom apis will be called
         * @type {String}
         */
        URL: '',
        /**
         * axiom user id will be stored in this variable
         * @type {String}
         */
        UserID: null,
        /**
         * access_token provided by axiom will be stored in this variable and then will be used in all other API calls automatically
         * @type {String}
         */
        access_token: '',

        /**
         * built in method used to validate Session, AppKey and URL which is used by axiom apis internally
         * @return {Object} Will return object having two fields. 
         *                  1. Status (-1 means 'not correct' and 0 means 'correct') 
         *                  2. message
         * @private
         */
        checkURL: function() {
            // jQuery.support.cors = true;
            if (AxiomAPIs.SessionID == '') {
                return { status: -1, message: 'Application is not initialized' };
            } else if (AxiomAPIs.AppKey == '') {
                return { status: -1, message: 'AppKey is not available' };
            } else if (AxiomAPIs.URL == '') {
                return { status: -1, message: 'URL is not available' };
            }
            return { status: 0, message: 'Success' };
        },

        /**
         * This method handles the status codes recieved from call to commonAPIs
         * @param  {Object}   xhr        HTTP call object
         * @param  {function}   parentF   the calling method of checkResponseCommonAPICall
         * @param  {String}   moduleName  the entity to which the method shoud be applies (project,task,file etc)
         * @param  {String}   apiName     Name of the method to be called on the backend
         * @param  {String}   methodType  The call type (HTTP verbs)
         * @param  {Object}   parameters  Data required by the API to execute
         * @param  {Function} cb          This a the Callback method to be called after the checkResponseCommonAPICall is excecuted
         * @private
         */
        checkResponseCommonAPICall: function(xhr, parentF, moduleName, apiName, methodType, parameters, cb) {
            // jQuery.support.cors = true;
            // console.log(xhr)

            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText)
                    /****************************** same as $.ajaxSetup *************************/
                if (result.reload) {
                    result = { status: 401, message: 'Unauthorized' };
                } else if (result.myCurrentSessionInfo != undefined) {
                    if (result.myCurrentSessionInfo.OrgSessionID + "_" + result.myCurrentSessionInfo.currConnectionID + "_" + result.myCurrentSessionInfo.currentRandomNumber == myCurrentSessionInfo.OrgSessionID + "_" + myCurrentSessionInfo.currConnectionID + "_" + myCurrentSessionInfo.currentRandomNumber) {
                        delete result.myCurrentSessionInfo;
                    } else {
                        //location.href = location.href;
                        result = { status: 401, message: 'Unauthorized' };
                    }
                } else {
                    // cross domain result ( I guess)
                    //location.href = location.href;
                }
                /****************************** same as $.ajaxSetup *************************/
                cb((result));
            } else if (xhr.status == 401) {
                AxiomAPIs.getAccessToken(function(response) {
                    //cb(response);
                    parentF(moduleName, apiName, methodType, parameters, cb);
                });
            } else if (xhr.status == 404) {
                result = { status: 404, message: 'Page not found' };
            } else {
                if (xhr.myCurrentSessionInfo != undefined) {
                    if (xhr.myCurrentSessionInfo.OrgSessionID + "_" + xhr.myCurrentSessionInfo.currConnectionID + "_" + xhr.myCurrentSessionInfo.currentRandomNumber == myCurrentSessionInfo.OrgSessionID + "_" + myCurrentSessionInfo.currConnectionID + "_" + myCurrentSessionInfo.currentRandomNumber) {
                        delete xhr.myCurrentSessionInfo;
                    }
                }
                if (cb)
                    cb(JSON.parse(xhr));
            }
        },

        /**
         *  This API makes a https request to the backend. It is a common method exposed to call any API
         * @param  {String}   moduleName  the entity to which the method shoud be applies (project,task,file etc)
         * @param  {String}   apiName     Name of the method to be called on the backend
         * @param  {String}   methodType  The call type (HTTP verbs)
         * @param  {Object}   parameters  Data required by the API to execute
         * @param  {Function} cb          This a the Callback method to be called after the commonAPICall is excecuted  
         * @private
         */
        commonAPICall: function(moduleName, apiName, methodType, parameters, cb) {
            var thisA = arguments;
            // jQuery.support.cors = true;

            var valid = AxiomAPIs.checkURL();
            if (valid.status != 0) {
                cb(valid);
            } else if (!AxiomAPIs.access_token) {
                return cb({ status: -1, message: 'access_token is not available' });
            } else {
                parameters.access_token = AxiomAPIs.access_token;

                var host = AxiomAPIs.URL.split(":")[1];
                const options = {
                    method: methodType.toLowerCase(),
                    hostname: host.substring(2, host.length),
                    path: '/apis/' + moduleName + '/' + apiName,
                    port: (AxiomAPIs.URL.split(":")[2])
                        // port:parseInt(AxiomAPIs.URL.split(":")[2])
                        //,
                        // qs: (methodType.toLowerCase() == 'get') ? parameters : undefined,
                        // body: (methodType.toLowerCase() !== 'get') ? parameters : undefined,
                        // json: true
                };
                if (methodType.toLowerCase() == 'get') {
                    var qs = '?';
                    Object.keys(parameters).forEach(function(e, i) {
                        qs += e + "=" + parameters[e]
                        if (Object.keys(parameters).length - 1 !== i) {
                            qs += '&';
                        }
                    });
                    options.path += qs
                }
                // console.log(options);
                /*var req = https.request(options, function(error, response, body) {
                    if (error) throw new Error(error);
                    AxiomAPIs.checkResponseCommonAPICall(body, thisA.callee, moduleName, apiName, methodType, parameters, cb);
                });*/

                var req = https.request(options, (myXHR) => {
                    var data = [];
                    myXHR.on('data', (d) => {
                        // console.log(d);
                        data.push(d);

                    });
                    myXHR.on('end', function() {

                        AxiomAPIs.checkResponseCommonAPICall(data.join(''), thisA.callee, moduleName, apiName, methodType, parameters, cb);
                    });
                });
                if (methodType.toLowerCase() !== 'get') {
                    req.write(JSON.stringify(parameters));
                }
                req.on('error', (e) => {

                    // console.error(e);
                });
                req.end();
                return req;



            }
        },

       

        /**
         * This all the projects for the current user. It includes the the projects associated
         * to the user as well as the public projects     
         * @param  {Function} cb       This is the Callback method tobe called after the listProjects is executed
         */
        listProjects: function(cb) {
            var parameters = {};
            AxiomAPIs.commonAPICall('project', 'listProject', 'get', parameters, cb);
        },

        /**
         * This all the public projects for the current user.
         * @param  {Boolean}  isMarket If one wants to recieve all public projects this 
         *                    field should be specified to 2 
         * @param  {Function} cb       This is the Callback method tobe called after the listPublicProjects is executed
         */
        listPublicProjects: function(isMarket, cb) {
            var parameters = {};
            if (isMarket || isMarket !== {} || isMarket !== null) {
                parameters.isMarket = isMarket;
            }
            AxiomAPIs.commonAPICall('project', 'listPublicProject', 'get', parameters, cb);
        },

        /**
         * To list all the members of a prjoect given the project ID
         * @param  {number}   projectID  Project's ID
         * @param  {Function} cb         This is the Callback method tobe called after the listProjectMembers is executed
         */
        listProjectMembers: function(projectID, cb) {
            var parameters = {
                projectID: projectID
            };
            AxiomAPIs.commonAPICall('project', 'memberList', 'get', parameters, cb);
        },
        /**
         * Get a list of all tags of the given element (i.e. tags assigned to table,task,file etc) assigned to a project
         * @param  {number}   elementTypeID Type Id agaisnt the element type chosen
         * @param  {number}   projectID     project ID
         * @param  {Function} cb           This is the Callback method tobe called after the getTagListByElement is executed
         */
        getTagListByElement: function(elementTypeID, projectID, cb) {
            var parameters = {
                elementTypeID: elementTypeID,
                projectID: projectID
            };
            AxiomAPIs.commonAPICall('project', 'getTagListByElement', 'post', parameters, cb);
        },
        /**
         * To add a new project or to update the details of an existing one
         * @param  {String}   name                 Project name
         * @param  {String}   desc                 Description of the project
         * @param  {number}   projectid            0 if new project
         * @param  {String}   URL                  BaseURL
         * @param  {String}   invitedStr           List of comma separated emailIDs of invited members
         * @param  {String}   Comment              Commment Text if added
         * @param  {String}   tagStr               List of comma separated tags
         * @param  {String}   Photo                file name for uploaded project image
         * @param  {String}   Overview             Overview of the project
         * @param  {String}   companyName          Company initiating the project
         * @param  {String}   department           The department under which the project falls
         * @param  {String}   productName          Product on which the prjoect is based
         * @param  {Boolean}  isOverviewActive     To activate the 'overview' section
         * @param  {Boolean}  isCollaVisible       1 to hide other collaborators
         * @param  {Boolean}  isMemberVisible      1 to hide other members
         * @param  {Boolean}  isDefaultColla       1 to make creator default collaborator
         * @param  {String}   fixTags              set tags
         * @param  {Boolean}  isOtherTagNotAllowed 1 if the word 'other' cannot be a tag
         * @param  {Boolean}  isOverviewUpdate     If an exisiting project is updated and the value of the 'overview' 
         *                                         key is changed this variable is to be set to 1
         * @param  {Function} cb                   This is the Callback method tobe called after the saveProject is executed
         */
        saveProject: function(name, desc, projectid, URL, invitedStr, Comment, tagStr, Photo, Overview, companyName, department, productName, isOverviewActive, isCollaVisible, isMemberVisible, isDefaultColla, fixTags, isOtherTagNotAllowed, isOverviewUpdate, cb) {

            var parameters = {
                name: name,
                desc: desc ? desc : undefined,
                projectid: projectid ? projectid : 0,
                invitedStr: invitedStr ? invitedStr : '',
                Comment: Comment ? Comment : undefined,
                tagStr: tagStr ? tagStr : '',
                Overview: Overview ? Overview : undefined,
                companyName: companyName ? companyName : undefined,
                department: department ? department : undefined,
                productName: productName ? productName : undefined,
                isOverviewActive: isOverviewActive ? isOverviewActive : 0,
                isCollaVisible: isCollaVisible ? isCollaVisible : 0,
                isMemberVisible: isMemberVisible ? isMemberVisible : 0,
                isDefaultColla: isDefaultColla ? isDefaultColla : 0,
                fixTags: fixTags ? fixTags : '',
                isOtherTagNotAllowed: isOtherTagNotAllowed ? isOtherTagNotAllowed : 0,
                isOverviewUpdate: isOverviewUpdate ? isOverviewUpdate : 0,
                URL: URL ? URL : undefined,
                photo: photo ? photo : undefined,
                Overview: Overview ? Overview : undefined
            };
            AxiomAPIs.commonAPICall('project', 'saveProject', 'post', parameters, cb);
        },

        /**
         * Get the value of the key 'overview' of a project given the project ID
         * @param  {number}   projectID Project ID
         * @param  {Function} cb        This is the Callback method tobe called after the getOverviewContent is executed
         */
        getOverviewContent: function(projectID, cb) {
            var parameters = {
                projectID: projectID
            };

            AxiomAPIs.commonAPICall('project', 'getOverviewContent', 'post', parameters, cb);
        },

        /**
         * Get all the information saved under a project given the projectID
         * @param  {number}   projectID 
         * @param  {Function} cb        This is the Callback method tobe called after the getProjectDetailsByProjectID is executed
         */
        getProjectDetailsByProjectID: function(projectID, cb) {
            var parameters = {
                projectID: projectID
            };
            AxiomAPIs.commonAPICall('project', 'getProjectDetailsByProjectID', 'post', parameters, cb);
        },
        /**
         * Delete a project given the projectID
         * @param  {number}   projectID 
         * @param  {Function} cb       This is the Callback method tobe called after the deleteProject is executed
         */
        deleteProject: function(parameters, cb) {
            AxiomAPIs.commonAPICall('project', 'deleteProject', 'post', parameters, cb);
        },
        /**
         * Add collaborators to a given project
         * @param  {number}   projectid  
         * @param  {String}   invitedStr List of comma separated emailIDs of invited members
         * @param  {Function} cb         This is the Callback method tobe called after the inviteMember is executed
         */
        inviteMember: function(projectid, invitedStr, cb) {
            var parameters = {
                projectid: projectid,
                invitedStr: invitedStr ? invitedStr : ''
            };
            AxiomAPIs.commonAPICall('project', 'inviteMember', 'post', parameters, cb);
        },
        /**
         * Get a list of all collaborators of a given project
         * @param  {number}   projectID 
         * @param  {Boolean}  isMarket  
         * @param  {Function} cb        This is the Callback method tobe called after the getCollaboratorList is executed
         */
        getCollaboratorList: function(projectID, isMarket, cb) {
            var parameters = {
                projectID: projectID,
                isMarket: isMarket
            };

            AxiomAPIs.commonAPICall('project', 'getCollaboratorList', 'post', parameters, cb);
        },
        /**
         * To remove an exisiting collaborator from the given project
         * @param  {String}   email     Registered email of the collaborator who is to be removed
         * @param  {number}   projectid 
         * @param  {Function} cb        This is the Callback method to be called after the removeCollaborators is executed
         */
        removeCollaborators: function(email, projectid, cb) {
            var parameters = {
                projectid: projectid,
                email: email
            };
            AxiomAPIs.commonAPICall('project', 'removeCollaborators', 'post', parameters, cb);
        },

        /**
         * This method facilitates the tranfer of ownership from one user to another
         * @param  {Number}   projectid      new owner's userID
         * @param  {Number}   ProjectOwnerID original owner's userID
         * @param  {Function} cb             This is the Callback method to be called after the changeOwner is executed
         */
        changeOwner: function(projectid, ProjectOwnerID, cb) {
            var parameters = {
                projectid: projectid,
                ProjectOwnerID: ProjectOwnerID
            };

            AxiomAPIs.commonAPICall('project', 'changeOwner', 'post', parameters, cb);
        },

        /**
         * Get user details of a collaborator of the given project
         * @param  {Number}   projectID 
         * @param  {Number}   collaID   userID of collaborator
         * @param  {Function} cb        This is the Callback method to be called after the getCollaboratorProfile is executed
         */
        getCollaboratorProfile: function(projectID, collaID, cb) {
            var parameters = {
                projectID: projectID,
                collaID: collaID
            };
            AxiomAPIs.commonAPICall('project', 'getCollaboratorProfile', 'post', parameters, cb);
        },

        /**
         * To get information about the given project berfore publishing
         * @param  {Number}   projectID 
         * @param  {Function} cb        This is the Callback method to be called after the getDetailForPublish is executed
         */
        getDetailForPublish: function(projectID, cb) {
            var parameters = {
                projectID: projectID
            };

            AxiomAPIs.commonAPICall('project', 'getDetailForPublish', 'post', parameters, cb);
        },

        /**
         * [publishProject description]
         * @param  {Number}   categoryID    CategoryID under which the project is to be published
         * @param  {Number}   subcategoryID  subcategoryID of the chosen category
         * @param  {Number}   projectID     
         * @param  {Function} cb            This is the Callback method to be called after the publishProject is executed
         */
        publishProject: function(subcategoryID, projectID, categoryID, cb) {
            var parameters = {
                subcategoryID: subcategoryID,
                projectID: projectID,
                categoryID: categoryID
            };

            AxiomAPIs.commonAPICall('project', 'publishProject', 'post', parameters, cb);
        },


        /**
         * Get the activity on a given project of the current user during their most recent login
         * @param  {Number}   projectID 
         * @param  {Function} cb        This is the Callback method to be called after the getRecentUpdates is executed
         */
        getRecentUpdates: function(projectID, cb) {
            var parameters = {
                projectID: projectID
            };

            AxiomAPIs.commonAPICall('project', 'getRecentUpdates', 'post', parameters, cb);
        },

        /**
         * Get a list of all media/files added under a project
         * @param  {Number}   projectID 
         * @param  {Boolean}  isMarket  project type
         * @param  {Function} cb        This is the Callback method to be called after the getFileListByProjectID is executed
         */
        getFileListByProjectID: function(projectID, isMarket, cb) {
            var parameters = {
                projectID: projectID,
                isMarket: isMarket ? isMarket : 0
            };

            AxiomAPIs.commonAPICall('file', 'getFileListByProjectID', 'post', parameters, cb);
        },

        /**
         * Get a list of permitted extention names of the files to be uploaded
         * @param  {Function} cb        This is the Callback method to be called after the getUploadExtentions is executed
         */
        getUploadExtentions: function(cb) {


            AxiomAPIs.commonAPICall('file', 'getUploadExtentions', 'post', {}, cb);
        },
        /**
         * resendSignupmail takes takes the email address of a newly registered user and 
         * sends them an email confirmation. 
         * @param  {String}   email   Email address to which the signup mail is sent
         * @param  {String}   captchaAns   captha code
         * @param  {Function} cb         This is the Callback method to be called after the resendSignupmail is executed
         */
        resendSignupmail: function(email, captchaAns, cb) {
            var parameters = {
                email: email,
                captchaAns: captchaAns ? captchaAns : ""
            };
            AxiomAPIs.commonAPICall('user', 'resendSignupmail', 'post', parameters, cb);
        },

        /**
         * Get all the tasks created by a user under the given project
         * @param  {Number}   projectID  
         * @param  {Boolean}  isMarket  
         * @param  {Function} cb        This is the Callback method to be called after the getAllTask is executed
         */
        getAllTask: function(projectID, isMarket, cb) {
            var parameters = {
                projectID: projectID,
                isMarket: isMarket ? isMarket : 0
            };
            AxiomAPIs.commonAPICall('task', 'getAllTask', 'post', parameters, cb);
        },

        /**
         * This helps add new tasks to a project or update exisiting ones given the project id 
         * @param  {Number}   taskID          
         * @param  {String}   taskName        Title for the task
         * @param  {String}   desc            Description
         * @param  {Number}   projectID       Container project
         * @param  {Number}   assignTo        ID of the user the task is assigned to be completed
         * @param  {String}   URL             baseURL
         * @param  {Number}   latitude        
         * @param  {Number}   longitude       
         * @param  {String}   strCCUserID     string of comma seperated IDs of the users to be CCed
         * @param  {Boolean}  isPublicdueDate 1 if due date is to be displayed publically
         * @param  {Number}   actualDueDate   date of entry
         * @param  {String}   tagStr          string of comma seperated tags to be linked to the task
         * @param  {Array}   fileInfo        Array of file details
         * @param  {Array}   deleteFileList  Array of files names to be removed
         * @param  {Array}   allFiles        Array of all filesname
         * @param  {Function} cb              This is the Callback method to be called after the createTask is executed
         */
        createTask: function(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb) {
            var parameters = {
                taskID: 0,
                taskName: taskName,
                desc: desc ? desc : undefined,
                projectID: projectID,
                assignTo: assignTo ? assignTo : undefined,
                URL: URL ? URL : '',
                latitude: latitude ? latitude : 0,
                longitude: latitude ? latitude : 0,
                strCCUserID: strCCUserID ? strCCUserID : '',
                isPublic: isPublic ? isPublic : 0,
                dueDate: dueDate ? dueDate : '',
                actualDueDate: actualDueDate ? actualDueDate : 0,
                tagStr: tagStr ? tagStr : '',
                fileInfo: fileInfo ? fileInfo : [],
                deleteFileList: deleteFileList ? deleteFileList : [],
                allFiles: allFiles ? allFiles : []

            };
            AxiomAPIs.commonAPICall('task', 'createTask', 'post', parameters, cb);
        },
        /**
         * This helps add new tasks to a project or update exisiting ones given the project id 
         * @param  {Number}   taskID          0 if updating existing task
         * @param  {String}   taskName        Title for the task
         * @param  {String}   desc            Description
         * @param  {Number}   projectID       Container project
         * @param  {Number}   assignTo        ID of the user the task is assigned to be completed
         * @param  {String}   URL             baseURL
         * @param  {Number}   latitude        
         * @param  {Number}   longitude       
         * @param  {String}   strCCUserID     string of comma seperated IDs of the users to be CCed
         * @param  {Boolean}  isPublicdueDate 1 if due date is to be displayed publically
         * @param  {Number}   actualDueDate   date of entry
         * @param  {String}   tagStr          string of comma seperated tags to be linked to the task
         * @param  {Array}   fileInfo        Array of file details
         * @param  {Array}   deleteFileList  Array of files names to be removed
         * @param  {Array}   allFiles        Array of all filesname
         * @param  {Function} cb              This is the Callback method to be called after the createTask is executed
         */
        updateTask: function(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb) {
            var parameters = {
                taskID: taskID,
                taskName: taskName,
                desc: desc ? desc : undefined,
                projectID: projectID,
                assignTo: assignTo ? assignTo : undefined,
                URL: URL ? URL : '',
                latitude: latitude ? latitude : 0,
                longitude: latitude ? latitude : 0,
                strCCUserID: strCCUserID ? strCCUserID : '',
                isPublic: isPublic ? isPublic : 0,
                dueDate: dueDate ? dueDate : '',
                actualDueDate: actualDueDate ? actualDueDate : 0,
                tagStr: tagStr ? tagStr : '',
                fileInfo: fileInfo ? fileInfo : [],
                deleteFileList: deleteFileList ? deleteFileList : [],
                allFiles: allFiles ? allFiles : []

            };
            AxiomAPIs.commonAPICall('task', 'updateTask', 'post', parameters, cb);
        },

        /**
         * Get information about  a task given the task ID
         * @param  {Number}   taskID    
         * @param  {Number}   projectID 
         * @param  {Boolean}  isMarket  
         * @param  {Function} cb        
         */
        getTaskDetailsByID: function(taskID, projectID, isMarket, cb) {
            var parameters = {
                taskID: taskID,
                isMarket: isMarket ? isMarket : undefined,
                projectID: projectID
            };
            AxiomAPIs.commonAPICall('task', 'getTaskDetailsByID', 'post', parameters, cb);
        },

        /**
         * Get activity logs of the given task of the current user
         * @param  {Number}   taskID 
         * @param  {Function} cb     
         */
        getPostHistory: function(taskID, cb) {
            var parameters = {
                taskID: taskID
            };
            AxiomAPIs.commonAPICall('task', 'getPostHistory', 'post', parameters, cb);

        },

        /**
         * This API facilitates the staus update on a task
         * @param  {String}   name   asignee name ?
         * @param  {Number}   taskID 
         * @param  {String}   URL    Base URL
         * @param  {Number}   status The value to which the status is to be updated
         * @param  {Function} cb     
         */
        updateTaskStatus: function(name, taskID, URL, status, cb) {
            var parameters = {
                name: name,
                taskID: taskID,
                URL: URL,
                status: status
            };
            AxiomAPIs.commonAPICall('task', 'updateTaskStatus', 'post', parameters, cb);
        },

        /**
         * saveComment posts a comment under the given task
         * @param  {Number}   taskID    Task ID
         * @param  {Number}   latitude  Geocoordinates of the current user
         * @param  {Number}   longitude Geocoordinates of the current user
         * @param  {String}   comment   Comment text to be posted
         * @param  {String}   URL       Base url
         * @param  {Array}   fileInfo  Array of file names uploaded with the comment
         * @param  {Function} cb        Callback method
         */
        saveComment: function(taskID, latitude, longitude, comment, URL, fileInfo, cb) {
            var parameters = {
                taskID: taskID,
                latitude: latitude,
                longitude: longitude,
                comment: comment,
                URL: URL ? URL : '',
                fileInfo: fileInfo ? fileInfo : undefined
            };

            AxiomAPIs.commonAPICall('task', 'saveComment', 'post', parameters, cb);
        },

        /**
         * This API deletes a comment given the comment ID
         * @param  {Number}   commentID Comment ID
         * @param  {Boolean}  isComment If the comment has text
         * @param  {String}   fileName  file name of attachment with the comment
         * @param  {Function} cb        Callback method
         */
        deleteComment: function(commentID, isComment, fileName, cb) {
            var parameters = {
                commentID: commentID,
                isComment: isComment,
                fileName: fileName
            };

            AxiomAPIs.commonAPICall('task', 'deleteComment', 'post', parameters, cb);
        },

        /**
         * Updates user's personal info 
         * @param  {String}   firstname      User's first name
         * @param  {String}   lastname       User's last name
         * @param  {String}   email          User's current registered email ID
         * @param  {String}   password       User's password
         * @param  {String}   oldEmailID     New emailID, if the email is to be updated
         * @param  {Number}   timezoneid     timezone of the user
         * @param  {String}   actualfilename file name of the user's profile picture
         * @param  {String}   URL            Base URL (to the uploaded files)
         * @param  {Function} cb             Callback method
         */
        updateprofile: function(firstname, lastname, email, password, oldEmailID, timezoneid, actualfilename, URL, cb) {
            var parameters = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                oldEmailID: oldEmailID ? oldEmailID : email,
                timezoneid: timezoneid,
                actualfilename: actualfilename ? actualfilename : "",
                URL: URL
            };

            AxiomAPIs.commonAPICall('user', 'updateprofile', 'post', parameters, cb);
        },


        /**
         * This API is used to change the password for the current user
         * @param  {String}   newPassword 
         * @param  {String}   oldPassword 
         * @param  {Function} cb          
         */
        updatepassword: function(newPassword, oldPassword, cb) {
            parameters = {};

            parameters.oldPassword = AxiomAPIs.encrypt(oldPassword);
            parameters.newPassword = AxiomAPIs.encrypt(newPassword);
            AxiomAPIs.commonAPICall('user', 'updatepassword', 'post', parameters, cb);
        },


        /**
         * Delete an ploaded file
         * @param  {String}   fileName 
         * @param  {Function} cb       
         */
        deleteFile: function(fileName, cb) {
            var parameters = {
                fileName: fileName
            };

            AxiomAPIs.commonAPICall('file', 'deleteFile', 'post', parameters, cb);
        },

        /**
         * Returns a list of activity of the given user
         * @param  {Number}   userID    
         * @param  {Function} cb        
         */
        getNotificationByUser: function(userID, cb) {
            var parameters = {
                userID: userID
            };

            AxiomAPIs.commonAPICall('user', 'getNotificationByUser', 'post', parameters, cb);
        },


        /**
         * Get all the activitties of a user over the week
         * @param  {Number}   userID    
         * @param  {Number}   weekNo    
         * @param  {Function} cb        
         */
        getNotificationList: function(userID, weekNo, cb) {
            var parameters = {
                userID: userID,
                weekNo: weekNo
            };

            AxiomAPIs.commonAPICall('user', 'getNotificationList', 'post', parameters, cb);
        },

       
        /**
         * List all the tables added to a project by the current user
         * @param  {Number}   projectID Project ID
         * @param  {Number}  isMarket   1 if project is public
         * @param  {Function} cb        Callback method
         */
        listTables: function(projectID, isMarket, cb) {
            var parameters = {
                projectID: projectID,
                isMarket: isMarket

            };

            AxiomAPIs.commonAPICall('table', 'listTables', 'get', parameters, cb);
        },


        /**
         * [getTableDetails description]
         * @param  {Number}   viewID            view ID                   
         * @param  {Number}   includeTempTable  If  1 put data in a temporary table            
         * @param  {String}   where             Conditions if any on the data to retrieved              
         * @param  {Function} cb                Callback method
         */
        getTableDetails: function(viewID, includeTempTable, where, cb) {
            var parameters = {
                viewID: viewID,
                includeTempTable: includeTempTable,
                where: where,
                dbConfig: dbConfig

            };

            AxiomAPIs.commonAPICall('table', 'getTableDetails', 'get', parameters, cb);
        },

        /**
         * This API fetches all the data from a given table
         * @param  {Number}   viewID               View ID 
         * @param  {Number}   from                 From cell number
         * @param  {Number}   to                   To cell number
         * @param  {String}   tableName            table Name
         * @param  {String}   where                conditions if to filter the data to be recieved
         * @param  {String}   commonAPITableName   Temporay name for the data between from and to  
         * @param  {Number}   considerTopXWhenDrop Return only X rows from the top if thi key is set 1
         * @param  {Number}   canViewOnlySelfRows  1 if only the rows assgined to the current user must be returned
         * @param  {Function} cb                   Callback method
         */
        getTableData: function(viewID, from, to, tableName, where, commonAPITableName, considerTopXWhenDrop, canViewOnlySelfRows, cb) {
            var parameters = {
                viewID: viewID,
                from: from,
                to: to,
                tableName: tableName,
                where: where,
                commonAPITableName: commonAPITableName,
                considerTopXWhenDrop: considerTopXWhenDrop,
                canViewOnlySelfRows: canViewOnlySelfRows,
                dbConfig: dbConfig
            };
            AxiomAPIs.commonAPICall('table', 'getTableData', 'get', parameters, cb);
        },

        /**
         * Get preexisting filters
         * @param  {Number}   viewID    ViewId of the view seen by the user
         * @param  {Number}   filterID  filterID of the filter to be retrieved
         * @param  {Function} cb        Callback Method
         */
        getTableFilters: function(viewID, filterID, cb) {
            var parameters = {
                viewID: viewID,
                filterID: filterID
            };
            AxiomAPIs.commonAPICall('table', 'getTableFilters', 'get', parameters, cb);
        },


        /**
         * For a given user and their view on a table, it returns if the table is 
         * locked. (i.e. not editable by the user)
         * @param  {Number}   tableID Table Id of the given table   
         * @param  {Number}   viewID  View Id of the given view 
         * @param  {Function} cb      Callback method
         */
        isTableLocked: function(tableID, viewID, cb) {
            var parameters = {
                tableID: tableID,
                viewID: viewID
            };

            AxiomAPIs.commonAPICall('table', 'isTableLocked', 'get', parameters, cb);
        },


        /**
         *  Delete filters that were applied on a table
         * @param  {String}   filterIDs Strimg of comma separated filterIDs 
         * @param  {Function} cb        Callback method
         */
        deleteTableFilters: function(filterIDs, cb) {
            var parameters = {
                filterIDs: filterIDs

            };

            AxiomAPIs.commonAPICall('table', 'deleteTableFilters', 'post', parameters, cb);
        },


        /**
         * Add a new filter to the table
         * @param  {Number}   viewID        ViewID
         * @param  {Number}   filterID      ID against the name of the filter to be applied
         * @param  {String}   filterName    filter's name
         * @param  {String}   filterDetails String of values to which filter is applied
         * @param  {Number}  isAlert        If 1, when the table updates, checks if any filter becomes applicable
         *                                  and if yes sends an email to collaborators about the change 
         * @param  {Function} cb            Callback method
         */
        saveTableFilters: function(viewID, filterID, filterName, filterDetails, isAlert, cb) {
            var parameters = {
                viewID: viewID,
                filterID: filterID,
                filterName: filterName,
                filterDetails: filterDetails,
                isAlert: isAlert
            };

            AxiomAPIs.commonAPICall('table', 'saveTableFilters', 'post', parameters, cb);
        },


        /**
         * This API sets the given filter as a deafult on the given table
         * @param {Number}   viewID    ViewID
         * @param {Number}   filterID  ID against the name of the filter to be applied
         * @param {Boolean}  isDefault Set to 1 to have the filter be applied to the table by default
         * @param {Function} cb        Callback method
         */
        setTableFilterAsDefault: function(viewID, filterID, isDefault, cb) {
            var parameters = {
                viewID: viewID,
                filterID: filterID,
                isDefault: isDefault
            };

            AxiomAPIs.commonAPICall('table', 'setTableFilterAsDefault', 'post', parameters, cb);
        },


        /**
         * Applies dynamic filters to a table
         * @param  {Number}   viewID       ViewID
         * @param  {Number}   filterID     ID against the name of the filter to be applied
         * @param  {Number}   showTopXRows Number of rows from the top to be displayed
         * @param  {String}   tn           Table name
         * @param  {Object}   filtersData  Stringified object having an array of the length equal 
         *                                 to the number of columns to which the filter is applied. 
         *                                 Each element in the array has filterName the cell numbers to be applies
         *                                 and the conditions on which it should be applied
         * @param  {Function} cb           Callback method
         */
        applyTableFilters: function(viewID, filterID, showTopXRows, tn, filtersData, cb) {
            var parameters = {
                viewID: viewID,
                filterID: filterID,
                showTopXRows: showTopXRows,
                tn: tn,
                filtersData: filtersData
            };

            AxiomAPIs.commonAPICall('table', 'applyTableFilters', 'post', parameters, cb);
        },


        /**
         * Gets user's rights(permissions) for a table that the user wants to publish
         * @param  {Number}   parentViewID The ID of the view underwhich the table was created
         * @param  {Number}   viewID       View ID of the table
         * @param  {String}   mode         
         * @param  {Number}   filterID     The Filter on the table
         * @param  {Number}   projectID    The project under which the table was created
         * @param  {Function} cb           Callback method
         */
        getUserRightsForPublish: function(parentViewID, viewID, mode, filterID, projectID, cb) {
            var parameters = {
                parentViewID: parentViewID,
                viewID: viewID,
                mode: mode,
                filterID: filterID,
                projectID: projectID

            };

            AxiomAPIs.commonAPICall('table', 'getUserRightsForPublish', 'post', parameters, cb);
        },


        /**
         * To delete a table from the view
         * @param  {String}   viewIDs   String of comma separated ViewIDs
         * @param  {Boolean}  isArchive If 1 archive/hide instead of delete
         * @param  {Function} cb        Callback method
         */
        removeTable: function(viewIDs, isArchive, cb) {
            AxiomAPIs.commonAPICall('table', 'removeTable', 'post', parameters, cb);
        },

        /**
         * Given a table and viewID, get the permitted fields (to the current user) to do a lookup on  
         * @param  {Number}   viewID    ID of the view
         * @param  {Number}   projectID ID of the projectID
         * @param  {Function} cb        Callback method
         */
        getLookupKeyColumns: function(viewID, projectID, cb) {
            AxiomAPIs.commonAPICall('table', 'getLookupKeyColumns', 'get', parameters, cb);
        },

        /**
         * Gets the table structure of the lookup for a given project of a given view for the current user
         * @param  {Number}   tableID   table ID
         * @param  {Number}   projectID Project ID
         * @param  {Number}   VDID      view details ID
         * @param  {Function} cb        Callback method
         */
        getLookupTableStructure: function(tableID, projectID, VDID, cb) {
            AxiomAPIs.commonAPICall('table', 'getLookupTableStructure', 'get', parameters, cb);
        },

        /**
         * Get the lookup values given the viewDetailsIDs 
         * @param  {String}   IDs String of comma separated viewDetailsIDs
         * @param  {Function} cb  Callback Function
         */
        getLookupValues: function(IDs, cb) {
            AxiomAPIs.commonAPICall('table', 'getLookupValues', 'get', parameters, cb);
        },
        /**
         * Get the change in call values over time given the rowID and viewID for the current user
         * @param  {Number}   rowID rowID
         * @param  {Number}   VDID  viewDetailsID
         * @param  {Function} cb    Callback method
         */
        getCellHistory: function(rowID, VDID, cb) {
            AxiomAPIs.commonAPICall('table', 'getCellHistory', 'get', parameters, cb);
        },


        /**
         * Save table structure and date of a view.If view doesn't exist a new one will be created
         * @param  {Number}   tableID              Table ID
         * @param  {Array}   arrDeletedRowsList   Array of Row nos to be deleted
         * @param  {Array}   arrAddedRowsList     Array of rows nos to be added
         * @param  {Array}   arrModifiedCellsList Array of cell nos that were modified
         * @param  {Array}   arrUniqueKeysList    Unique keys
         * @param  {Number}   viewId               View ID
         * @param  {Number}   parentViewID         Parent view ID
         * @param  {Number}   filterID             Filter ID
         * @param  {String}   tableName            Table Name
         * @param  {String}   tDescription         About the table
         * @param  {String}   tagStr               String of comma separated tags
         * @param  {Number}  isMasterView         
         * @param  {Number}   projectID            ProjectID
         * @param  {Number}  isImported           
         * @param  {Number}   connectorID          
         * @param  {String}   fNames               
         * @param  {Number}   tableColumns         
         * @param  {Number}   versionDisabled      
         * @param  {Date}   lastModifiedOn       
         * @param  {Boolean}  isStructChanged      
         * @param  {String}   arrDependency        
         * @param  {JSON}   freezeJSON           
         * @param  {Boolean}  isLastChunk          
         * @param  {Function} cb                   Callback method
         * @private
         */
        saveTableStructureAndData: function(tableID, arrDeletedRowsList, arrAddedRowsList, arrModifiedCellsList, arrUniqueKeysList, viewId, parentViewID, filterID, tableName, tDescription, tagStr, isMasterView, projectID, isImported, connectorID, fNames, tableColumns, versionDisabled, lastModifiedOn, isStructChanged, arrDependency, freezeJSON, isLastChunk, cb) {

                var parameters = {
                    tableID: tableID,
                    deletedRows: arrDeletedRowsList,
                    addedRows: arrAddedRowsList,
                    changedData: arrModifiedCellsList,
                    uniqueKeys: arrUniqueKeysList,
                    chunkNumber: 0,
                    viewID: viewId,
                    parentViewID: parentViewID,
                    filterID: filterID,
                    tableName: tableName,
                    tableDescription: tDescription,
                    tagStr: tagStr,
                    isMasterView: isMasterView,
                    projectID: projectID,
                    isImported: isImported,
                    connectorID: connectorID,
                    fieldDetails: fNames,
                    columnsInfo: tableColumns,
                    versionDisabled: versionDisabled,
                    lastModifiedOn: lastModifiedOn,
                    isStructChanged: isStructChanged,
                    arrDependency: arrDependency,
                    freezeRC: freezeJSON,
                    isLastChunk: isLastChunk,
                }
                var thisA = arguments;
                // jQuery.support.cors = true;

                var valid = AxiomAPIs.checkURL();
                if (valid.status != 0) {
                    cb(valid);
                } else {
                    parameters.access_token = AxiomAPIs.access_token;
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener("error", transferFailed, false);
                    xhr.addEventListener("abort", transferCanceled, false);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            var response = JSON.parse(xhr.responseText);
                            cb(response);
                        }
                    };
                    xhr.open("POST", AxiomAPIs.URL + '/apis/table/saveTableStructureAndData', true);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.setRequestHeader("X-Request-By", "HTTPAxiomMethod");
                    xhr.setRequestHeader("Content-Type", "text/json");
                    xhr.send(JSON.stringify(parameters));
                }
            }
       
    };
    return AxiomAPIs;
};
