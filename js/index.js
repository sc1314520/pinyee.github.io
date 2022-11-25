window.onload=function(){
    let i=0;
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
            apiUrl:'https://script.google.com/macros/s/AKfycbxm3-Fv1H3nALJWp98WCtwavL4hnbCch_Jcs_smDCQRsaqYnTi5v2aB6O_AEsJ-GPo/exec',
            sending: false,
        },
        methods:{
            insertData(){
                var time = new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate();
                i++;
                var obs ={
                    index:i,
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
                formdata.append('index', obs.index);
                formdata.append('subject', obs.subject);
                formdata.append('section', obs.section);
                formdata.append('date', obs.date);

                const config = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
                };
                fetch(this.apiUri, config)
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


