window.onload=function(){
    const vm =new Vue({
        el:"#form",
        data:{
            obj:[],
            sub:'',
            sec:'',
            date:'',
            cpp:'',
            Java:'',
            Python:'',
            hc:'',
            Js:'',
            st:{},
            ver:false,
            range:{
                "C++":50,
                "Java":715,
                "Python":131,
                "html/css":148,
                "JavaScript":140
            },

            // fetch
            apiUrl:'https://script.google.com/macros/s/AKfycbz4yvGM-Tp46RKRHR7sSBBTXp0-RmEIe04WCjhjUVUelFLyZpr8PqO-LWowYjvQP8g/exec',
            sending: false,
        },
        methods:{
            insertData(){
                var time = new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate();
                var obs ={
                    subject:this.sub,
                    section:this.sec,
                    date:time
                }
                if(this.sub==""){
                    alert("請選擇科目");
                }
                else if (this.sec.indexOf("~")==-1) {
                    alert("章節格式錯誤")
                }
                else if(this.sec.split("~")[1]>this.range[this.sub]){
                    alert("不可輸入超過該章節最大範圍之數值");
                }
                else{
                    if(confirm("您的資料為： 科目："+this.sub+"、 章節："+this.sec)){
                        console.log("順利輸出");
                        this.obj.push(obs);
                        this.submit(obs);
                        
                        if(+obs.section.split("~")[1]>st[obs.subject][0] || st[obs.subject][0]==undefined){
                            console.log("重繪")
                            if(obs.subject=="JavaScript"){
                                this["Js"]=+obs.section.split("~")[1];
                            }
                            else if(obs.subject=="html/css"){
                                this["hc"]=+obs.section.split("~")[1];
                            }
                            else{
                                this[obs.subject]=+obs.section.split("~")[1];
                                console.log(this[obs.subject]);
                            }
                        }
                    }  
                }

                
                
            },
            submit(obs){
                this.sending = true;
                console.log("send");

                // 資料創建
                let formdata = new FormData();
                formdata.append('subject', obs.subject);
                formdata.append('section', obs.section);
                formdata.append('date', obs.date);

                var config = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
                };
                fetch(this.apiUrl, config)
                .then(response => response.text())
                .then(result => {
                    if(result === 'success') {
                    this.sending = false;
                    }
                    console.log(result);
                })
                .catch(error => console.log('error', error));
            },
            getData(){
                var obj;
                console.log("get");
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.apiUrl, config)
                .then(response => response.text())
                .then(result => {
                  st={
                    "C++":[],
                    "Java":[],
                    "Python":[],
                    "html/css":[],
                    "JavaScript":[]
                  }
                  var data = JSON.parse(result);
                  for(ob in data){
                    var old =new Date(data[ob].date.split("T")[0].split("-")[0],data[ob].date.split("T")[0].split("-")[1],data[ob].date.split("T")[0].split("-")[2]).getTime();
                    var nw = new Date(old+86400000);

                    console.log(nw)
                    var k ={
                        subject:data[ob].subject,
                        section:data[ob].section,
                        date:nw.getFullYear()+"/"+nw.getMonth()+"/"+nw.getDate()
                    }
                    this.obj.push(k);
                    st[data[ob].subject].push(+data[ob].section.split("~")[1]);
                    console.log(st);
                  }
                  for(arr in st){
                    st[arr].sort().reverse();
                  }
                  this.cpp=st["C++"][0]
                  this.Java=st["Java"][0]
                  this.Python=st["Python"][0]
                  this.hc=st["html/css"][0]
                  this.Js=st["JavaScript"][0]
                })
                .catch(error => console.log('error', error));
                
            },
            pinyee(){
                var verify = prompt("請輸入驗證代碼：")
                if(verify=="pinyee"){
                    this.ver =true;
                }
                else{
                    this.ver=false;
                    alert("驗證失敗");
                } 
            }
            
        }
        
    })
    vm.pinyee();
    vm.getData();
}


