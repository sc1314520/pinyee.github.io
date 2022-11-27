window.onload=function(){
    const vm = new Vue({
        el:'#form2',
        data:{
            obj:[],
            point:0,
            ver:false,

            //
            sending:false, 
            apiUrl:'https://script.google.com/macros/s/AKfycbw0eIg5YFS87rZ9kLJu_WCHhtAiBprG5N0F3MYgZUHg0_eRXUV_Y_JKVNUc_yZEpL50LQ/exec'
            
        },
        methods:{
            go(items){
                this.subtitle=items.pro;
                this.show=true;
            },
            submit(obs){
                if(confirm("確認送出？")){
                    obs.state="申請中"
                    this.sending = true;
                    console.log("send");
    
                    // 資料創建
                    let formdata = new FormData();
                    formdata.append('name', obs.name);
                    formdata.append('cost', obs.cost);
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
                }
                
            },
            getData(){ // 可行
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.apiUrl, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  for(key in data){
                    if(data[key].name==""){

                    }
                    else{
                        if(data[key].state==""){
                            data[key].state="未申請"
                            this.obj.push(data[key]);
                            this.point=parseInt(data[key].point) 
                        }
                        else{
                            this.obj.push(data[key]);
                            this.point=parseInt(data[key].point)
                        }   
                    }
                  }
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
    });
    vm.pinyee();
    vm.getData();
}