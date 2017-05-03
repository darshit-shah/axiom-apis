<a name="module_axiom-apis"></a>

## axiom-apis
Axiom-apis module.

Usage:

var axiom = require('axiom-apis')();

**See**: www.npmjs.com/package/axiom-apis  

* [axiom-apis](#module_axiom-apis)
    * [~AxiomAPIs](#module_axiom-apis..AxiomAPIs) : <code>Object</code>
        * [.URL](#module_axiom-apis..AxiomAPIs.URL) : <code>String</code>
        * [.UserID](#module_axiom-apis..AxiomAPIs.UserID) : <code>String</code>
        * [.access_token](#module_axiom-apis..AxiomAPIs.access_token) : <code>String</code>
        * [.listProjects(cb)](#module_axiom-apis..AxiomAPIs.listProjects)
        * [.listPublicProjects(isMarket, cb)](#module_axiom-apis..AxiomAPIs.listPublicProjects)
        * [.listProjectMembers(projectID, cb)](#module_axiom-apis..AxiomAPIs.listProjectMembers)
        * [.getTagListByElement(elementTypeID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getTagListByElement)
        * [.saveProject(name, desc, projectid, URL, invitedStr, Comment, tagStr, Photo, Overview, companyName, department, productName, isOverviewActive, isCollaVisible, isMemberVisible, isDefaultColla, fixTags, isOtherTagNotAllowed, isOverviewUpdate, cb)](#module_axiom-apis..AxiomAPIs.saveProject)
        * [.getOverviewContent(projectID, cb)](#module_axiom-apis..AxiomAPIs.getOverviewContent)
        * [.getProjectDetailsByProjectID(projectID, cb)](#module_axiom-apis..AxiomAPIs.getProjectDetailsByProjectID)
        * [.deleteProject(projectID, cb)](#module_axiom-apis..AxiomAPIs.deleteProject)
        * [.inviteMember(projectid, invitedStr, cb)](#module_axiom-apis..AxiomAPIs.inviteMember)
        * [.getCollaboratorList(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getCollaboratorList)
        * [.removeCollaborators(email, projectid, cb)](#module_axiom-apis..AxiomAPIs.removeCollaborators)
        * [.changeOwner(projectid, ProjectOwnerID, cb)](#module_axiom-apis..AxiomAPIs.changeOwner)
        * [.getCollaboratorProfile(projectID, collaID, cb)](#module_axiom-apis..AxiomAPIs.getCollaboratorProfile)
        * [.getDetailForPublish(projectID, cb)](#module_axiom-apis..AxiomAPIs.getDetailForPublish)
        * [.publishProject(categoryID, subcategoryID, projectID, cb)](#module_axiom-apis..AxiomAPIs.publishProject)
        * [.getRecentUpdates(projectID, cb)](#module_axiom-apis..AxiomAPIs.getRecentUpdates)
        * [.getFileListByProjectID(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getFileListByProjectID)
        * [.getUploadExtentions(cb)](#module_axiom-apis..AxiomAPIs.getUploadExtentions)
        * [.resendSignupmail(email, captchaAns, cb)](#module_axiom-apis..AxiomAPIs.resendSignupmail)
        * [.getAllTask(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getAllTask)
        * [.createTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)](#module_axiom-apis..AxiomAPIs.createTask)
        * [.updateTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)](#module_axiom-apis..AxiomAPIs.updateTask)
        * [.getTaskDetailsByID(taskID, projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getTaskDetailsByID)
        * [.getPostHistory(taskID, cb)](#module_axiom-apis..AxiomAPIs.getPostHistory)
        * [.updateTaskStatus(name, taskID, URL, status, cb)](#module_axiom-apis..AxiomAPIs.updateTaskStatus)
        * [.saveComment(taskID, latitude, longitude, comment, URL, fileInfo, cb)](#module_axiom-apis..AxiomAPIs.saveComment)
        * [.deleteComment(commentID, isComment, fileName, cb)](#module_axiom-apis..AxiomAPIs.deleteComment)
        * [.updateprofile(firstname, lastname, email, password, oldEmailID, timezoneid, actualfilename, URL, cb)](#module_axiom-apis..AxiomAPIs.updateprofile)
        * [.updatepassword(newPassword, oldPassword, cb)](#module_axiom-apis..AxiomAPIs.updatepassword)
        * [.deleteFile(fileName, cb)](#module_axiom-apis..AxiomAPIs.deleteFile)
        * [.getNotificationByUser(userID, cb)](#module_axiom-apis..AxiomAPIs.getNotificationByUser)
        * [.getNotificationList(userID, weekNo, cb)](#module_axiom-apis..AxiomAPIs.getNotificationList)
        * [.listTables(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.listTables)
        * [.getTableDetails(viewID, includeTempTable, where, cb)](#module_axiom-apis..AxiomAPIs.getTableDetails)
        * [.getTableData(viewID, from, to, tableName, where, commonAPITableName, considerTopXWhenDrop, canViewOnlySelfRows, cb)](#module_axiom-apis..AxiomAPIs.getTableData)
        * [.getTableFilters(viewID, filterID, cb)](#module_axiom-apis..AxiomAPIs.getTableFilters)
        * [.isTableLocked(tableID, viewID, cb)](#module_axiom-apis..AxiomAPIs.isTableLocked)
        * [.deleteTableFilters(filterIDs, cb)](#module_axiom-apis..AxiomAPIs.deleteTableFilters)
        * [.saveTableFilters(viewID, filterID, filterName, filterDetails, isAlert, cb)](#module_axiom-apis..AxiomAPIs.saveTableFilters)
        * [.setTableFilterAsDefault(viewID, filterID, isDefault, cb)](#module_axiom-apis..AxiomAPIs.setTableFilterAsDefault)
        * [.applyTableFilters(viewID, filterID, showTopXRows, tn, filtersData, cb)](#module_axiom-apis..AxiomAPIs.applyTableFilters)
        * [.getUserRightsForPublish(parentViewID, viewID, mode, filterID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getUserRightsForPublish)
        * [.removeTable(viewIDs, isArchive, cb)](#module_axiom-apis..AxiomAPIs.removeTable)
        * [.getLookupKeyColumns(viewID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getLookupKeyColumns)
        * [.getLookupTableStructure(tableID, projectID, VDID, cb)](#module_axiom-apis..AxiomAPIs.getLookupTableStructure)
        * [.getLookupValues(IDs, cb)](#module_axiom-apis..AxiomAPIs.getLookupValues)
        * [.getCellHistory(rowID, VDID, cb)](#module_axiom-apis..AxiomAPIs.getCellHistory)

<a name="module_axiom-apis..AxiomAPIs"></a>

### axiom-apis~AxiomAPIs : <code>Object</code>
AxiomAPIs is wrapper library to call axiom APIs.

**Kind**: inner property of [<code>axiom-apis</code>](#module_axiom-apis)  

* [~AxiomAPIs](#module_axiom-apis..AxiomAPIs) : <code>Object</code>
    * [.URL](#module_axiom-apis..AxiomAPIs.URL) : <code>String</code>
    * [.UserID](#module_axiom-apis..AxiomAPIs.UserID) : <code>String</code>
    * [.access_token](#module_axiom-apis..AxiomAPIs.access_token) : <code>String</code>
    * [.listProjects(cb)](#module_axiom-apis..AxiomAPIs.listProjects)
    * [.listPublicProjects(isMarket, cb)](#module_axiom-apis..AxiomAPIs.listPublicProjects)
    * [.listProjectMembers(projectID, cb)](#module_axiom-apis..AxiomAPIs.listProjectMembers)
    * [.getTagListByElement(elementTypeID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getTagListByElement)
    * [.saveProject(name, desc, projectid, URL, invitedStr, Comment, tagStr, Photo, Overview, companyName, department, productName, isOverviewActive, isCollaVisible, isMemberVisible, isDefaultColla, fixTags, isOtherTagNotAllowed, isOverviewUpdate, cb)](#module_axiom-apis..AxiomAPIs.saveProject)
    * [.getOverviewContent(projectID, cb)](#module_axiom-apis..AxiomAPIs.getOverviewContent)
    * [.getProjectDetailsByProjectID(projectID, cb)](#module_axiom-apis..AxiomAPIs.getProjectDetailsByProjectID)
    * [.deleteProject(projectID, cb)](#module_axiom-apis..AxiomAPIs.deleteProject)
    * [.inviteMember(projectid, invitedStr, cb)](#module_axiom-apis..AxiomAPIs.inviteMember)
    * [.getCollaboratorList(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getCollaboratorList)
    * [.removeCollaborators(email, projectid, cb)](#module_axiom-apis..AxiomAPIs.removeCollaborators)
    * [.changeOwner(projectid, ProjectOwnerID, cb)](#module_axiom-apis..AxiomAPIs.changeOwner)
    * [.getCollaboratorProfile(projectID, collaID, cb)](#module_axiom-apis..AxiomAPIs.getCollaboratorProfile)
    * [.getDetailForPublish(projectID, cb)](#module_axiom-apis..AxiomAPIs.getDetailForPublish)
    * [.publishProject(categoryID, subcategoryID, projectID, cb)](#module_axiom-apis..AxiomAPIs.publishProject)
    * [.getRecentUpdates(projectID, cb)](#module_axiom-apis..AxiomAPIs.getRecentUpdates)
    * [.getFileListByProjectID(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getFileListByProjectID)
    * [.getUploadExtentions(cb)](#module_axiom-apis..AxiomAPIs.getUploadExtentions)
    * [.resendSignupmail(email, captchaAns, cb)](#module_axiom-apis..AxiomAPIs.resendSignupmail)
    * [.getAllTask(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getAllTask)
    * [.createTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)](#module_axiom-apis..AxiomAPIs.createTask)
    * [.updateTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)](#module_axiom-apis..AxiomAPIs.updateTask)
    * [.getTaskDetailsByID(taskID, projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.getTaskDetailsByID)
    * [.getPostHistory(taskID, cb)](#module_axiom-apis..AxiomAPIs.getPostHistory)
    * [.updateTaskStatus(name, taskID, URL, status, cb)](#module_axiom-apis..AxiomAPIs.updateTaskStatus)
    * [.saveComment(taskID, latitude, longitude, comment, URL, fileInfo, cb)](#module_axiom-apis..AxiomAPIs.saveComment)
    * [.deleteComment(commentID, isComment, fileName, cb)](#module_axiom-apis..AxiomAPIs.deleteComment)
    * [.updateprofile(firstname, lastname, email, password, oldEmailID, timezoneid, actualfilename, URL, cb)](#module_axiom-apis..AxiomAPIs.updateprofile)
    * [.updatepassword(newPassword, oldPassword, cb)](#module_axiom-apis..AxiomAPIs.updatepassword)
    * [.deleteFile(fileName, cb)](#module_axiom-apis..AxiomAPIs.deleteFile)
    * [.getNotificationByUser(userID, cb)](#module_axiom-apis..AxiomAPIs.getNotificationByUser)
    * [.getNotificationList(userID, weekNo, cb)](#module_axiom-apis..AxiomAPIs.getNotificationList)
    * [.listTables(projectID, isMarket, cb)](#module_axiom-apis..AxiomAPIs.listTables)
    * [.getTableDetails(viewID, includeTempTable, where, cb)](#module_axiom-apis..AxiomAPIs.getTableDetails)
    * [.getTableData(viewID, from, to, tableName, where, commonAPITableName, considerTopXWhenDrop, canViewOnlySelfRows, cb)](#module_axiom-apis..AxiomAPIs.getTableData)
    * [.getTableFilters(viewID, filterID, cb)](#module_axiom-apis..AxiomAPIs.getTableFilters)
    * [.isTableLocked(tableID, viewID, cb)](#module_axiom-apis..AxiomAPIs.isTableLocked)
    * [.deleteTableFilters(filterIDs, cb)](#module_axiom-apis..AxiomAPIs.deleteTableFilters)
    * [.saveTableFilters(viewID, filterID, filterName, filterDetails, isAlert, cb)](#module_axiom-apis..AxiomAPIs.saveTableFilters)
    * [.setTableFilterAsDefault(viewID, filterID, isDefault, cb)](#module_axiom-apis..AxiomAPIs.setTableFilterAsDefault)
    * [.applyTableFilters(viewID, filterID, showTopXRows, tn, filtersData, cb)](#module_axiom-apis..AxiomAPIs.applyTableFilters)
    * [.getUserRightsForPublish(parentViewID, viewID, mode, filterID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getUserRightsForPublish)
    * [.removeTable(viewIDs, isArchive, cb)](#module_axiom-apis..AxiomAPIs.removeTable)
    * [.getLookupKeyColumns(viewID, projectID, cb)](#module_axiom-apis..AxiomAPIs.getLookupKeyColumns)
    * [.getLookupTableStructure(tableID, projectID, VDID, cb)](#module_axiom-apis..AxiomAPIs.getLookupTableStructure)
    * [.getLookupValues(IDs, cb)](#module_axiom-apis..AxiomAPIs.getLookupValues)
    * [.getCellHistory(rowID, VDID, cb)](#module_axiom-apis..AxiomAPIs.getCellHistory)

<a name="module_axiom-apis..AxiomAPIs.URL"></a>

#### AxiomAPIs.URL : <code>String</code>
url on which all axiom apis will be called

**Kind**: static property of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  
<a name="module_axiom-apis..AxiomAPIs.UserID"></a>

#### AxiomAPIs.UserID : <code>String</code>
axiom user id will be stored in this variable

**Kind**: static property of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  
<a name="module_axiom-apis..AxiomAPIs.access_token"></a>

#### AxiomAPIs.access_token : <code>String</code>
access_token provided by axiom will be stored in this variable and then will be used in all other API calls automatically

**Kind**: static property of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  
<a name="module_axiom-apis..AxiomAPIs.listProjects"></a>

#### AxiomAPIs.listProjects(cb)
This all the projects for the current user. It includes the the projects associated
to the user as well as the public projects

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | This is the Callback method tobe called after the listProjects is executed |

<a name="module_axiom-apis..AxiomAPIs.listPublicProjects"></a>

#### AxiomAPIs.listPublicProjects(isMarket, cb)
This all the public projects for the current user.

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| isMarket | <code>Boolean</code> | If one wants to recieve all public projects this                     field should be specified to 2 |
| cb | <code>function</code> | This is the Callback method tobe called after the listPublicProjects is executed |

<a name="module_axiom-apis..AxiomAPIs.listProjectMembers"></a>

#### AxiomAPIs.listProjectMembers(projectID, cb)
To list all the members of a prjoect given the project ID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>number</code> | Project's ID |
| cb | <code>function</code> | This is the Callback method tobe called after the listProjectMembers is executed |

<a name="module_axiom-apis..AxiomAPIs.getTagListByElement"></a>

#### AxiomAPIs.getTagListByElement(elementTypeID, projectID, cb)
Get a list of all tags of the given element (i.e. tags assigned to table,task,file etc) assigned to a project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| elementTypeID | <code>number</code> | Type Id agaisnt the element type chosen |
| projectID | <code>number</code> | project ID |
| cb | <code>function</code> | This is the Callback method tobe called after the getTagListByElement is executed |

<a name="module_axiom-apis..AxiomAPIs.saveProject"></a>

#### AxiomAPIs.saveProject(name, desc, projectid, URL, invitedStr, Comment, tagStr, Photo, Overview, companyName, department, productName, isOverviewActive, isCollaVisible, isMemberVisible, isDefaultColla, fixTags, isOtherTagNotAllowed, isOverviewUpdate, cb)
To add a new project or to update the details of an existing one

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Project name |
| desc | <code>String</code> | Description of the project |
| projectid | <code>number</code> | 0 if new project |
| URL | <code>String</code> | BaseURL |
| invitedStr | <code>String</code> | List of comma separated emailIDs of invited members |
| Comment | <code>String</code> | Commment Text if added |
| tagStr | <code>String</code> | List of comma separated tags |
| Photo | <code>String</code> | file name for uploaded project image |
| Overview | <code>String</code> | Overview of the project |
| companyName | <code>String</code> | Company initiating the project |
| department | <code>String</code> | The department under which the project falls |
| productName | <code>String</code> | Product on which the prjoect is based |
| isOverviewActive | <code>Boolean</code> | To activate the 'overview' section |
| isCollaVisible | <code>Boolean</code> | 1 to hide other collaborators |
| isMemberVisible | <code>Boolean</code> | 1 to hide other members |
| isDefaultColla | <code>Boolean</code> | 1 to make creator default collaborator |
| fixTags | <code>String</code> | set tags |
| isOtherTagNotAllowed | <code>Boolean</code> | 1 if the word 'other' cannot be a tag |
| isOverviewUpdate | <code>Boolean</code> | If an exisiting project is updated and the value of the 'overview'                                          key is changed this variable is to be set to 1 |
| cb | <code>function</code> | This is the Callback method tobe called after the saveProject is executed |

<a name="module_axiom-apis..AxiomAPIs.getOverviewContent"></a>

#### AxiomAPIs.getOverviewContent(projectID, cb)
Get the value of the key 'overview' of a project given the project ID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>number</code> | Project ID |
| cb | <code>function</code> | This is the Callback method tobe called after the getOverviewContent is executed |

<a name="module_axiom-apis..AxiomAPIs.getProjectDetailsByProjectID"></a>

#### AxiomAPIs.getProjectDetailsByProjectID(projectID, cb)
Get all the information saved under a project given the projectID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>number</code> |  |
| cb | <code>function</code> | This is the Callback method tobe called after the getProjectDetailsByProjectID is executed |

<a name="module_axiom-apis..AxiomAPIs.deleteProject"></a>

#### AxiomAPIs.deleteProject(projectID, cb)
Delete a project given the projectID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>number</code> |  |
| cb | <code>function</code> | This is the Callback method tobe called after the deleteProject is executed |

<a name="module_axiom-apis..AxiomAPIs.inviteMember"></a>

#### AxiomAPIs.inviteMember(projectid, invitedStr, cb)
Add collaborators to a given project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectid | <code>number</code> |  |
| invitedStr | <code>String</code> | List of comma separated emailIDs of invited members |
| cb | <code>function</code> | This is the Callback method tobe called after the inviteMember is executed |

<a name="module_axiom-apis..AxiomAPIs.getCollaboratorList"></a>

#### AxiomAPIs.getCollaboratorList(projectID, isMarket, cb)
Get a list of all collaborators of a given project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>number</code> |  |
| isMarket | <code>Boolean</code> |  |
| cb | <code>function</code> | This is the Callback method tobe called after the getCollaboratorList is executed |

<a name="module_axiom-apis..AxiomAPIs.removeCollaborators"></a>

#### AxiomAPIs.removeCollaborators(email, projectid, cb)
To remove an exisiting collaborator from the given project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | Registered email of the collaborator who is to be removed |
| projectid | <code>number</code> |  |
| cb | <code>function</code> | This is the Callback method to be called after the removeCollaborators is executed |

<a name="module_axiom-apis..AxiomAPIs.changeOwner"></a>

#### AxiomAPIs.changeOwner(projectid, ProjectOwnerID, cb)
This method facilitates the tranfer of ownership from one user to another

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectid | <code>Number</code> | new owner's userID |
| ProjectOwnerID | <code>Number</code> | original owner's userID |
| cb | <code>function</code> | This is the Callback method to be called after the changeOwner is executed |

<a name="module_axiom-apis..AxiomAPIs.getCollaboratorProfile"></a>

#### AxiomAPIs.getCollaboratorProfile(projectID, collaID, cb)
Get user details of a collaborator of the given project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> |  |
| collaID | <code>Number</code> | userID of collaborator |
| cb | <code>function</code> | This is the Callback method to be called after the getCollaboratorProfile is executed |

<a name="module_axiom-apis..AxiomAPIs.getDetailForPublish"></a>

#### AxiomAPIs.getDetailForPublish(projectID, cb)
To get information about the given project berfore publishing

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> |  |
| cb | <code>function</code> | This is the Callback method to be called after the getDetailForPublish is executed |

<a name="module_axiom-apis..AxiomAPIs.publishProject"></a>

#### AxiomAPIs.publishProject(categoryID, subcategoryID, projectID, cb)
[publishProject description]

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| categoryID | <code>Number</code> | CategoryID under which the project is to be published |
| subcategoryID | <code>Number</code> | subcategoryID of the chosen category |
| projectID | <code>Number</code> |  |
| cb | <code>function</code> | This is the Callback method to be called after the publishProject is executed |

<a name="module_axiom-apis..AxiomAPIs.getRecentUpdates"></a>

#### AxiomAPIs.getRecentUpdates(projectID, cb)
Get the activity on a given project of the current user during their most recent login

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> |  |
| cb | <code>function</code> | This is the Callback method to be called after the getRecentUpdates is executed |

<a name="module_axiom-apis..AxiomAPIs.getFileListByProjectID"></a>

#### AxiomAPIs.getFileListByProjectID(projectID, isMarket, cb)
Get a list of all media/files added under a project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> |  |
| isMarket | <code>Boolean</code> | project type |
| cb | <code>function</code> | This is the Callback method to be called after the getFileListByProjectID is executed |

<a name="module_axiom-apis..AxiomAPIs.getUploadExtentions"></a>

#### AxiomAPIs.getUploadExtentions(cb)
Get a list of permitted extention names of the files to be uploaded

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | This is the Callback method to be called after the getUploadExtentions is executed |

<a name="module_axiom-apis..AxiomAPIs.resendSignupmail"></a>

#### AxiomAPIs.resendSignupmail(email, captchaAns, cb)
resendSignupmail takes takes the email address of a newly registered user and 
sends them an email confirmation.

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | Email address to which the signup mail is sent |
| captchaAns | <code>String</code> | captha code |
| cb | <code>function</code> | This is the Callback method to be called after the resendSignupmail is executed |

<a name="module_axiom-apis..AxiomAPIs.getAllTask"></a>

#### AxiomAPIs.getAllTask(projectID, isMarket, cb)
Get all the tasks created by a user under the given project

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> |  |
| isMarket | <code>Boolean</code> |  |
| cb | <code>function</code> | This is the Callback method to be called after the getAllTask is executed |

<a name="module_axiom-apis..AxiomAPIs.createTask"></a>

#### AxiomAPIs.createTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)
This helps add new tasks to a project or update exisiting ones given the project id

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| taskID | <code>Number</code> |  |
| taskName | <code>String</code> | Title for the task |
| desc | <code>String</code> | Description |
| projectID | <code>Number</code> | Container project |
| assignTo | <code>Number</code> | ID of the user the task is assigned to be completed |
| URL | <code>String</code> | baseURL |
| latitude | <code>Number</code> |  |
| longitude | <code>Number</code> |  |
| strCCUserID | <code>String</code> | string of comma seperated IDs of the users to be CCed |
| isPublicdueDate | <code>Boolean</code> | 1 if due date is to be displayed publically |
| actualDueDate | <code>Number</code> | date of entry |
| tagStr | <code>String</code> | string of comma seperated tags to be linked to the task |
| fileInfo | <code>Array</code> | Array of file details |
| deleteFileList | <code>Array</code> | Array of files names to be removed |
| allFiles | <code>Array</code> | Array of all filesname |
| cb | <code>function</code> | This is the Callback method to be called after the createTask is executed |

<a name="module_axiom-apis..AxiomAPIs.updateTask"></a>

#### AxiomAPIs.updateTask(taskID, taskName, desc, projectID, assignTo, URL, latitude, longitude, strCCUserID, isPublicdueDate, actualDueDate, tagStr, fileInfo, deleteFileList, allFiles, cb)
This helps add new tasks to a project or update exisiting ones given the project id

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| taskID | <code>Number</code> | 0 if updating existing task |
| taskName | <code>String</code> | Title for the task |
| desc | <code>String</code> | Description |
| projectID | <code>Number</code> | Container project |
| assignTo | <code>Number</code> | ID of the user the task is assigned to be completed |
| URL | <code>String</code> | baseURL |
| latitude | <code>Number</code> |  |
| longitude | <code>Number</code> |  |
| strCCUserID | <code>String</code> | string of comma seperated IDs of the users to be CCed |
| isPublicdueDate | <code>Boolean</code> | 1 if due date is to be displayed publically |
| actualDueDate | <code>Number</code> | date of entry |
| tagStr | <code>String</code> | string of comma seperated tags to be linked to the task |
| fileInfo | <code>Array</code> | Array of file details |
| deleteFileList | <code>Array</code> | Array of files names to be removed |
| allFiles | <code>Array</code> | Array of all filesname |
| cb | <code>function</code> | This is the Callback method to be called after the createTask is executed |

<a name="module_axiom-apis..AxiomAPIs.getTaskDetailsByID"></a>

#### AxiomAPIs.getTaskDetailsByID(taskID, projectID, isMarket, cb)
Get information about  a task given the task ID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| taskID | <code>Number</code> | 
| projectID | <code>Number</code> | 
| isMarket | <code>Boolean</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.getPostHistory"></a>

#### AxiomAPIs.getPostHistory(taskID, cb)
Get activity logs of the given task of the current user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| taskID | <code>Number</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.updateTaskStatus"></a>

#### AxiomAPIs.updateTaskStatus(name, taskID, URL, status, cb)
This API facilitates the staus update on a task

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | asignee name ? |
| taskID | <code>Number</code> |  |
| URL | <code>String</code> | Base URL |
| status | <code>Number</code> | The value to which the status is to be updated |
| cb | <code>function</code> |  |

<a name="module_axiom-apis..AxiomAPIs.saveComment"></a>

#### AxiomAPIs.saveComment(taskID, latitude, longitude, comment, URL, fileInfo, cb)
saveComment posts a comment under the given task

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| taskID | <code>Number</code> | Task ID |
| latitude | <code>Number</code> | Geocoordinates of the current user |
| longitude | <code>Number</code> | Geocoordinates of the current user |
| comment | <code>String</code> | Comment text to be posted |
| URL | <code>String</code> | Base url |
| fileInfo | <code>Array</code> | Array of file names uploaded with the comment |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.deleteComment"></a>

#### AxiomAPIs.deleteComment(commentID, isComment, fileName, cb)
This API deletes a comment given the comment ID

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| commentID | <code>Number</code> | Comment ID |
| isComment | <code>Boolean</code> | If the comment has text |
| fileName | <code>String</code> | file name of attachment with the comment |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.updateprofile"></a>

#### AxiomAPIs.updateprofile(firstname, lastname, email, password, oldEmailID, timezoneid, actualfilename, URL, cb)
Updates user's personal info

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| firstname | <code>String</code> | User's first name |
| lastname | <code>String</code> | User's last name |
| email | <code>String</code> | User's current registered email ID |
| password | <code>String</code> | User's password |
| oldEmailID | <code>String</code> | New emailID, if the email is to be updated |
| timezoneid | <code>Number</code> | timezone of the user |
| actualfilename | <code>String</code> | file name of the user's profile picture |
| URL | <code>String</code> | Base URL (to the uploaded files) |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.updatepassword"></a>

#### AxiomAPIs.updatepassword(newPassword, oldPassword, cb)
This API is used to change the password for the current user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| newPassword | <code>String</code> | 
| oldPassword | <code>String</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.deleteFile"></a>

#### AxiomAPIs.deleteFile(fileName, cb)
Delete an ploaded file

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| fileName | <code>String</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.getNotificationByUser"></a>

#### AxiomAPIs.getNotificationByUser(userID, cb)
Returns a list of activity of the given user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| userID | <code>Number</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.getNotificationList"></a>

#### AxiomAPIs.getNotificationList(userID, weekNo, cb)
Get all the activitties of a user over the week

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type |
| --- | --- |
| userID | <code>Number</code> | 
| weekNo | <code>Number</code> | 
| cb | <code>function</code> | 

<a name="module_axiom-apis..AxiomAPIs.listTables"></a>

#### AxiomAPIs.listTables(projectID, isMarket, cb)
List all the tables added to a project by the current user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| projectID | <code>Number</code> | Project ID |
| isMarket | <code>Number</code> | 1 if project is public |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getTableDetails"></a>

#### AxiomAPIs.getTableDetails(viewID, includeTempTable, where, cb)
[getTableDetails description]

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | view ID |
| includeTempTable | <code>Number</code> | If  1 put data in a temporary table |
| where | <code>String</code> | Conditions if any on the data to retrieved |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getTableData"></a>

#### AxiomAPIs.getTableData(viewID, from, to, tableName, where, commonAPITableName, considerTopXWhenDrop, canViewOnlySelfRows, cb)
This API fetches all the data from a given table

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | View ID |
| from | <code>Number</code> | From cell number |
| to | <code>Number</code> | To cell number |
| tableName | <code>String</code> | table Name |
| where | <code>String</code> | conditions if to filter the data to be recieved |
| commonAPITableName | <code>String</code> | Temporay name for the data between from and to |
| considerTopXWhenDrop | <code>Number</code> | Return only X rows from the top if thi key is set 1 |
| canViewOnlySelfRows | <code>Number</code> | 1 if only the rows assgined to the current user must be returned |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getTableFilters"></a>

#### AxiomAPIs.getTableFilters(viewID, filterID, cb)
Get preexisting filters

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | ViewId of the view seen by the user |
| filterID | <code>Number</code> | filterID of the filter to be retrieved |
| cb | <code>function</code> | Callback Method |

<a name="module_axiom-apis..AxiomAPIs.isTableLocked"></a>

#### AxiomAPIs.isTableLocked(tableID, viewID, cb)
For a given user and their view on a table, it returns if the table is 
locked. (i.e. not editable by the user)

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| tableID | <code>Number</code> | Table Id of the given table |
| viewID | <code>Number</code> | View Id of the given view |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.deleteTableFilters"></a>

#### AxiomAPIs.deleteTableFilters(filterIDs, cb)
Delete filters that were applied on a table

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| filterIDs | <code>String</code> | Strimg of comma separated filterIDs |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.saveTableFilters"></a>

#### AxiomAPIs.saveTableFilters(viewID, filterID, filterName, filterDetails, isAlert, cb)
Add a new filter to the table

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | ViewID |
| filterID | <code>Number</code> | ID against the name of the filter to be applied |
| filterName | <code>String</code> | filter's name |
| filterDetails | <code>String</code> | String of values to which filter is applied |
| isAlert | <code>Number</code> | If 1, when the table updates, checks if any filter becomes applicable                                  and if yes sends an email to collaborators about the change |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.setTableFilterAsDefault"></a>

#### AxiomAPIs.setTableFilterAsDefault(viewID, filterID, isDefault, cb)
This API sets the given filter as a deafult on the given table

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | ViewID |
| filterID | <code>Number</code> | ID against the name of the filter to be applied |
| isDefault | <code>Boolean</code> | Set to 1 to have the filter be applied to the table by default |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.applyTableFilters"></a>

#### AxiomAPIs.applyTableFilters(viewID, filterID, showTopXRows, tn, filtersData, cb)
Applies dynamic filters to a table

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | ViewID |
| filterID | <code>Number</code> | ID against the name of the filter to be applied |
| showTopXRows | <code>Number</code> | Number of rows from the top to be displayed |
| tn | <code>String</code> | Table name |
| filtersData | <code>Object</code> | Stringified object having an array of the length equal                                  to the number of columns to which the filter is applied.                                  Each element in the array has filterName the cell numbers to be applies                                 and the conditions on which it should be applied |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getUserRightsForPublish"></a>

#### AxiomAPIs.getUserRightsForPublish(parentViewID, viewID, mode, filterID, projectID, cb)
Gets user's rights(permissions) for a table that the user wants to publish

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| parentViewID | <code>Number</code> | The ID of the view underwhich the table was created |
| viewID | <code>Number</code> | View ID of the table |
| mode | <code>String</code> |  |
| filterID | <code>Number</code> | The Filter on the table |
| projectID | <code>Number</code> | The project under which the table was created |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.removeTable"></a>

#### AxiomAPIs.removeTable(viewIDs, isArchive, cb)
To delete a table from the view

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewIDs | <code>String</code> | String of comma separated ViewIDs |
| isArchive | <code>Boolean</code> | If 1 archive/hide instead of delete |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getLookupKeyColumns"></a>

#### AxiomAPIs.getLookupKeyColumns(viewID, projectID, cb)
Given a table and viewID, get the permitted fields (to the current user) to do a lookup on

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| viewID | <code>Number</code> | ID of the view |
| projectID | <code>Number</code> | ID of the projectID |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getLookupTableStructure"></a>

#### AxiomAPIs.getLookupTableStructure(tableID, projectID, VDID, cb)
Gets the table structure of the lookup for a given project of a given view for the current user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| tableID | <code>Number</code> | table ID |
| projectID | <code>Number</code> | Project ID |
| VDID | <code>Number</code> | view details ID |
| cb | <code>function</code> | Callback method |

<a name="module_axiom-apis..AxiomAPIs.getLookupValues"></a>

#### AxiomAPIs.getLookupValues(IDs, cb)
Get the lookup values given the viewDetailsIDs

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| IDs | <code>String</code> | String of comma separated viewDetailsIDs |
| cb | <code>function</code> | Callback Function |

<a name="module_axiom-apis..AxiomAPIs.getCellHistory"></a>

#### AxiomAPIs.getCellHistory(rowID, VDID, cb)
Get the change in call values over time given the rowID and viewID for the current user

**Kind**: static method of [<code>AxiomAPIs</code>](#module_axiom-apis..AxiomAPIs)  

| Param | Type | Description |
| --- | --- | --- |
| rowID | <code>Number</code> | rowID |
| VDID | <code>Number</code> | viewDetailsID |
| cb | <code>function</code> | Callback method |

