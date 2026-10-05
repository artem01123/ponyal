var M={};T.forEach(function(x){M[x.id]=x});
var sec="algebra",gr=0,cur=null;
function next(id){return T.filter(function(x){return x.pre.indexOf(id)>-1})}
function chain(id,seen,out){M[id].pre.forEach(function(p){if(!seen[p]){seen[p]=1;chain(p,seen,out);out.push(p)}});return out}
function lk(id){var x=M[id];return '<a class="'+x.sec+'" href="#'+id+'">'+x.title+' <span class="mu">· '+x.gr+' кл.</span></a>'}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function side(){
 var h="";for(var k in S)h+='<button class="'+k+(k==sec?' on':'')+'" data-s="'+k+'">'+S[k]+'</button>';
 document.getElementById("tabs").innerHTML=h;
 h="";[0,9,10,11].forEach(function(g){h+='<button'+(g==gr?' class="on"':'')+' data-g="'+g+'">'+(g?g+' кл.':'Все')+'</button>'});
 document.getElementById("chips").innerHTML=h;
 h="";T.filter(function(x){return x.sec==sec&&(!gr||x.gr==gr)}).forEach(function(x){h+='<a href="#'+x.id+'" class="'+(x.id==cur?'cur':'')+'"><small>'+x.gr+'</small>'+x.title+'</a>'});
 document.getElementById("list").innerHTML=h}
function page(){
 var id=location.hash.slice(1),x=M[id],m=document.getElementById("main");cur=x?id:null;
 if(x)sec=x.sec;side();
 if(!x){m.innerHTML='<div class="card"><h2>Добро пожаловать</h2><p>Выбери раздел — <b>алгебра</b> или <b>геометрия</b> — и тему слева. В каждой теме есть конспект, а внизу — ссылки на темы, которые нужно знать сначала, и на темы, куда она ведёт дальше. Связи работают и между разделами: например, тригонометрия (алгебра) опирается на прямоугольный треугольник (геометрия).</p><p class="mu">Всего тем: '+T.length+'. Начни с тем без предпосылок: квадратные уравнения, функции, прогрессии, теорема Пифагора.</p></div>';return}
 var h='<div class="card"><span class="tag '+x.sec+'">'+S[x.sec]+'</span><span class="mu">'+x.gr+' класс</span><h2>'+x.title+'</h2>';
 x.body.forEach(function(p){h+=p.indexOf("f:")==0?'<div class="f">'+esc(p.slice(2))+'</div>':'<p>'+esc(p)+'</p>'});
 h+='<h3>Сначала нужно знать</h3>'+(x.pre.length?'<div class="links">'+x.pre.map(lk).join("")+'</div>':'<span class="mu">Эта тема — начальная, предпосылок нет.</span>');
 var c=chain(id,{},[]);
 if(c.length>1)h+='<h3>Полный путь изучения</h3><ol class="path">'+c.map(function(p){return '<li><a href="#'+p+'">'+M[p].title+'</a></li>'}).join("")+'<li><b>'+x.title+'</b></li></ol>';
 var n=next(id);h+='<h3>Эта тема нужна для</h3>'+(n.length?'<div class="links">'+n.map(function(y){return lk(y.id)}).join("")+'</div>':'<span class="mu">Дальше по цепочке тем нет.</span>');
 m.innerHTML=h+'</div>';window.scrollTo(0,0)}
document.addEventListener("click",function(e){var b=e.target.closest("button");if(b){if(b.dataset.s)sec=b.dataset.s;if(b.dataset.g!==undefined)gr=+b.dataset.g;side()}});
document.getElementById("home").onclick=function(){location.hash="";page()};
addEventListener("hashchange",page);page();
