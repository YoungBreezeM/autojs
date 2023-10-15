// id("search_bar_layout").findOne().click()

// s = className("android.widget.EditText").findOne()

// setTimeout(()=>{
//     s.setText("iphone15 pro max")
//     className("android.view.View").desc("搜索").findOne().click()
// },1000)

const getList = ()=>{
  let sc = className("ScrollView").findOne()
  return sc.children().slice(3)
}

const parseDescInfo = (s)=>{
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

getList().forEach(node => {
  let info = parseDescInfo(node.desc())
  console.log(node)
  if (info['price'] <= 10000){
    node.click()
    setTimeout(()=>{
       className("android.widget.ImageView").desc("宝贝还在吗？").findOne().click()
       sleep(1000)
       className("android.view.View").desc("发送").findOne().click()
       sleep(1000)
       back()
       sleep(1000)
       back()
    },1000)
   
  }
});
// for (let key in getList()) {
//   console.log(getList.)
// }
// console.log(c.childCount())
// // let content = c.child(0).child(0).child(0).child(6)
// for (let i=0;i<c.childCount();i++){
//   console.log("===\n",i,c.child(i))
// }

// for(let i  in d){
//     let de = d[i].desc()
//     if(de &&de.length>10){
//         console.log("========================\n",d[i].desc())
//       let b = d[i].bounds()
//       click(b.centerX(), b.centerY());
//       className("android.view.View").desc("我想要").findOne().click()
//       className("android.widget.EditText").findOne().setText("hello")
//       sleep(1000)
//     }
// }
// let de = d[2].desc()
//     if(de &&de.length>10){
//         console.log("========================\n",d[0].desc())
//       let b = d[0].bounds()
//       click(b.centerX(), b.centerY());
//       className("android.view.View").desc("我想要").findOne().click()
//       className("android.widget.EditText").findOne().setText("hello")
//       sleep(1000)
//     }
// click(46, 1287 , 518, 1361)