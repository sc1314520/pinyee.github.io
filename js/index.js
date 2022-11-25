window.onload=function(){
    new Vue({
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

            // fetch
            apiUrl:'https://script.google.com/macros/s/AKfycbzIyTJd00nmGvSL-p9MqnzuOaGukjxzDuIfCib4EXkLBixow7RJ_Ia3iizqnctNkBc/exec',
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
                this.obj.push(obs);
                if(this.sub=="C++"){
                    var end = this.sec.split("~")[1];
                    this.cpp=end;
                   
                }
                else if(this.sub=="Java"){
                    var end = this.sec.split("~")[1];
                    this.Java=end;
                }
                else if(this.sub=="Python"){
                    var end = this.sec.split("~")[1];
                    this.Python=end;
                }
                else if(this.sub=="html/css"){
                    var end = this.sec.split("~")[1];
                    this.hc=end;
                }
                else if(this.sub=="JavaScript"){
                    var end = this.sec.split("~")[1];
                    this.Js=end;
                }
                this.submit(obs);
            },
            submit(obs){
                this.sending = true;
                console.log("send");

                // 資料創建
                let formdata = new FormData();
                formdata.append('subject', obs.subject);
                formdata.append('section', obs.section);
                formdata.append('date', obs.date);

                const config = {
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
            }
            
        }
    })
}


