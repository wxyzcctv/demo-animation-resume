function writeCode(prefix,code,fn){
    let n = 0
    let domCode = document.querySelector('#code')
    let id = setInterval(
        ()=>{
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
        //     这句话就实现了的是将添加的代码中的HTML标签替换了，这样就能实现代码的高亮
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        // 加上这一句就能实现当整个页面显示不全所有的代码的时候就将整个页面向下拉10000像素，
        // 向下拉10000像素的方法比较傻
        // scrollHeight就是将页面向下拉到不能再向下为止，这两者实现的效果是一样的
        if(n>=code.length){
            window.clearInterval(id)
            fn.call()
        }
    },10)
}
function writeMarkdown(markdown,fn){
    let n = 0
    let domPaper = document.querySelector('#content')
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML =markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn.call()
        }
    },10) 
}
var result = `/*
  面试官你好，我是xxx
  我将以动画的形式来介绍我自己
  自用文字介绍太单调了
  我将用代码来介绍
  首先准备一些样式
*/
*{transition:all 1s;}
html{
   background:rgb(222,222,222);
   font-size:16px;
}
#code{
   border:1px solid red;
   padding:16px;
}
/*我需要一点代码高亮*/
.token.comment{
    color:slategray;
}
.token.selector{
    color: #690;
}
.token.punctuation{
    color: #999;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}
/*加点3D效果*/
#code{
    transform-origin: left;
    transform: rotateX(0deg) rotateY(35deg);
}
#code{
    position: fixed;
    left:0;
    width:50%;
    height:100%;
}
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    display:flex;
    justify-content: center;
    align-content:center;
    background:black;
    padding:16px;
}
#content{
    background:white;
    width:100%;
    height:100%;
}
/*我需要一张白纸*/
`
var result2 = `
#paper{
}
`
var md = `
    # 自我介绍

    我叫xxx
    1993年10月出生
    xxx学校毕业
    自学前端半年
    希望应聘前端开发岗位

    # 技能介绍

    熟悉JavaScript css

    # 项目介绍

    1.xxx 轮播
    2.xxx 简历
    3.xxx 画板

    # 联系方式

    微信 xxxxxxx
    Email xxxxxxxx
    手机 xxxxxxx

    # 联系方式

    微信 xxxxxxx
    Email xxxxxxxx
    手机 xxxxxxx

    # 联系方式

    微信 xxxxxxx
    Email xxxxxxxx
    手机 xxxxxxx
`
// 实现代码的高亮主要是通过引入了一个prism的css库和js库，然后将该库所设置的默认代码颜色全部变为黑色，
// 在需要将代码执行到某处的时候进行高亮，就将所有的之前标注的颜色在变回来

writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md)
        })
    })
})

function createPaper(fn){
    let paper = document.createElement('div')
    paper.id = 'paper'
    let content = document.createElement('pre')
    content.id = 'content'
    document.body.appendChild(paper)
    paper.appendChild(content)
    fn.call()
}
