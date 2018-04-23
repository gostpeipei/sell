var initTreeData = function (typeId, appId, versionId, isEdit) {
  isEdit = isEdit || false;
  $.ajax({
    url: basePath + '/baseEnv/initTreeData',
    data: {
      typeId: typeId,
      appId :appId,
      versionId :versionId
    },
    type: 'post',
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      errorMsg(textStatus);
    },
    success: function (data) {
      treeData = data;
      if(!isSearch || isEdit){
        loadtreeDatas(treeData);
        var  testType = $("#addTestType");
        var  addApply = $("#addApply");
        var addCaseName = $("#addCaseName").val();
        if(testType.find('option').length === 0){
          for(var  i =0;i<data.length;i++){
            if(data[i].type === "types"){
              testType.append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
            }
          }
        }        
        if(addApply.find('option').length === 0){
          for(var  i =0;i<data.length;i++){
            if(data[i].pId ==="0_types"){
              addApply.append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
            }
          }
        }
      }else{
        temp++;
        if($("#addCaseName").val()){
          if(temp === 2){
            searchConcatNodes(appData, treeData);
          }
        }else{
          loadtreeDatas(treeData)
        }
      }
    }
  });
};



var searchConcatNodes = function(appData, treeData) {
    // console.log(appData);
    // console.log(treeData)
    temp = 0;
    if(appData.length === 0){
      loadtreeDatas([]);
      return false;
    }
    var level1Id = [];
    var appDataPId = []; //返回用例的所有pId
    for(var i = 0;i< appData.length;i++){
        level1Id.push(appData[i].appId + '_app_' + appData[i].typeId);  //
        appDataPId.push(appData[i].pId)
      }

      var level3 = [];
      var level3PId = [];
      var level2 = [];
      var level2PId = [];
      var level1 = [];
      var level1PId =[];

      treeData.forEach(function(item, index) {
        //判断3级时候 就要判断是否是第一级下的子节点level1Id.indexOf(item.pId) !== -1
        if(appDataPId.indexOf(item.id) !== -1 && level1Id.indexOf(item.pId) !== -1){
          level3.unshift(item);
          level3PId.push(item.pId)
        }
      })
      treeData.forEach(function(item, index) {
        if(level3PId.indexOf(item.id) !== -1){
          level2.unshift(item)
          level2PId.push(item.pId)
        }
      })
      treeData.forEach(function(item, index) {
        if(level2PId.indexOf(item.id) !== -1){
          level1.unshift(item)
          level1PId.unshift(item.pId)
        }
      })
    //ppp
    for(var i = 0;i<level2.length;i++){
      level2[i].open  = true;
    }
    for(var i = 0;i<level3.length;i++){
      level3[i].open  = true;
    }
    loadtreeDatas(level3.concat(level2,level1,appData))
  }


/**
 * 选择应用，点击版本，加载用例
 */
 var loadCaseInfo = function (typeId,appId,versionId,testCaseName) {
  var cond = {};
  var params = {};
  params.versionId =versionId;
  params.appId = appId;
  params.typeId = typeId;
  params.testCaseName = testCaseName;
  params.deleteFlag = 'N';
  params.active = "active";
  cond.draw = 1;
  cond.length = 500;
  cond.search = params;
  cond.order = '';
  cond.start = 0;
  $.ajax({
    url: basePath + '/case/treeCaseList',
    data: {data: JSON.stringify(cond)},
    type: 'post',
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      errorMsg(textStatus);
    },
    success: function (data) {
      appData = data.data;
      var treeObj = $.fn.zTree.getZTreeObj("datas-tree");
      var treeObj1 = $.fn.zTree.getZTreeObj("update-datas-tree");
      var addCaseName = $("#addCaseName").val();
      var updateCaseName = $("#updateCaseName").val();

      var parentZNode = treeObj.getNodeByParam("id",versionId,null);
      var parentZNode1 = treeObj1.getNodeByParam("id",versionId,null);

      if(!hasAddAppData[versionId] || !hasUpdateData[versionId]) {
        debugger
        for(var i =0;i<appData.length;i++){
          treeObj.addNodes(parentZNode,appData[i])
          treeObj1.addNodes(parentZNode1,appData[i])
        }
        hasAddAppData[versionId] = true;
        hasUpdateData[versionId] = true;
      }
      if(isSearch){
        temp++;
        if($("#addCaseName").val() || $("#updateCaseName").val()){
          if(temp === 2){
            searchConcatNodes(appData, treeData)
          }
        }else{
          loadtreeDatas(treeData)
        }
      }
      caseInfo = data;
    }
  });
};