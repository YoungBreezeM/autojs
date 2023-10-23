let list = className('ListView').findOne().children()

let cancerSubscribe = ()=>{
    let u = className("android.widget.LinearLayout").find()
    let user = null
    for (let i in u.toArray()) {
        if ( u[i].id() == 'com.tencent.mm:id/by2'){
            let b = u[i].bounds()
            click(b.centerX(), b.centerY());
            user = b
            break
        }
       
    }
    
    sleep(1000)
    click(user.centerX(), user.centerY());
    sleep(1000)
    id("ahh").findOne().children().forEach(child => {
        var target = child.findOne(id("ko8"));
        if (target.text() == "不再关注"){
            let b = target.bounds()
            click(b.centerX(), b.centerY());
            sleep(2000)
            id("gv3").findOne().click()
        }
       
    });
}

while(list.length>0){
    console.log("=====",list.length)
    let node = list[0]
    let item = node.child(node.getChildCount()-1)
    let tar = item.child(0).child(0).child(1)
    click(tar.bounds().centerX(),tar.bounds().centerY())
    sleep(1000)
    cancerSubscribe()

    sleep(2000)
    
    list = className('ListView').findOne().children()
}
