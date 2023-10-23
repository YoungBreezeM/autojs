


"ui";

let  FishAuto = ()=> {
  let list = null
  let scView = null



  let init = ()=>{

    createUi()
  }

  let createUi = ()=>{

  //   var w = floaty.rawWindow(
  //     <frame gravity="center" bg="#44ffcc00">
  //         <button id="ok" text="确定"/>
  //     </frame>
  // );  
    ui.layout(
        <vertical padding="16">
            <text textSize="16sp" textColor="black" text="请输入搜索商品"/>
            <input id="name" text="" />
            <text textSize="16sp" textColor="black" text="请输入价格"/>
            <input id="price" number="0" />
            <button id="ok" text="确定"/>
        </vertical>
    );

    ui.ok.click(()=>{
      console.log("ok")
      
      threads.start(function () {
        app.launch("com.taobao.idlefish");
        
        sleep(1000)
        run()
    });
      
    })
  }

  let search = ()=>{
    id("search_bar_layout").findOne().click()
    let s = className("android.widget.EditText").findOne()
    sleep(1000)
    s.setText("iphone15 pro max")
    className("android.view.View").desc("搜索").findOne().click()
  }

  //
  let getList = ()=>{
    if (!scView){
      toast("请打开咸鱼搜索列表")
      return
    }

    return scView.children().slice(3)
  }

  //
  let parseDescInfo = (s)=>{
    let reg1 = new RegExp("\ufffc","g"); // 加'g'，删除字符串里所有的"a"
    let a1 = s.replace(reg1,"");
    let ar = a1.split("\n")
    let info = {}
  
    for (let index = 0; index < ar.length; index++) {
      if (ar[index].endsWith('km')){
        info['distance'] = ar[index]
      }
  
      if (ar[index].length >=10){
        info['desc'] = ar[index]
      }
  
      if (ar[index] == '¥'){
        if (ar[index+1].length<=1){
          info['price'] = ar[index+1]+ar[index+2]+ar[index+3]
        }else{
          info['price'] = ar[index+1]
        }
  
        if (info['price']){
          let ps = info['price'].split(/(万)/g)
          if (ps[1] &&ps[1] == '万'){
            info['price'] = (parseFloat(ps[0])*10000).toFixed(2)
          }
          
        }
      }
  
      if (ar[index].endsWith('GB')){
        info['capacity'] = ar[index]
      }
  
      if (ar[index].length<=10 && ar[index].includes('新')){
        info['fineness'] = ar[index]
      }
  
      if (ar[index].includes('想要')){
        info['hot'] = ar[index]
      }
    }
  
   return info
  
  }

  //
  let sendMsg = ()=>{
    sleep(1000)
    let msg = className("android.widget.ImageView").desc("宝贝还在吗？").findOne(1000)
    if (msg){
      msg.click()
      sleep(1000)
      className("android.view.View").desc("发送").findOne().click()
      sleep(1000)
      back()
      sleep(1000)
      back()
      sleep(1000)
    }else{
      back()
      sleep(1000)
    }
    
  }
  //
  let contact = (node)=>{
    if (!node){
      console.log("node is null")
      return
    }

    let info = parseDescInfo(node.desc())
    if (info['price'] <= 9600){
      console.log(info)
      let b = node.bounds();
      click(b.centerX(), b.centerY());
      sendMsg()
    }
  }

  //
  let run = ()=>{
    scView = className("ScrollView").findOne(1000)
    while(true){
      getList().forEach(node => {
        contact(node)
      });

      next()
    }
    
  }

  let next = ()=>{
    if (!scView){
      toastLog("请打开咸鱼搜索列表")
      return
    }
    let bd = scView.bounds()
    swipe(bd.top,bd.bottom/1.5,bd.left,bd.right/1.5,1000)
    scView = className("ScrollView").findOne(1000)
  }
  

  return {
    init,
    next,
    run
  }
}

let f = FishAuto()
f.init()
// f.run()
