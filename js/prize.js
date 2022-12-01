window.onload=function(){
    const vm = new Vue({
        el:'#form2',
        data:{
            obj:[],
            subtitle:'',
            link:'',
            show:false,
            point:0,
            pro:'',
            ver:false,
            //
            sending:false, 
            //apiUrl:'https://script.google.com/macros/s/AKfycbw1WTf3nID5xaUBb7KiKuNq8XZEjkHETADy_ZVKuhsbDgYBtqG5HqIykEZPBPVSm5Y/exec'
            
        },
        methods:{
            go(items){
                this.subtitle=items.pro;
                this.show=true;
            },
            submit(){ // 待解決
                if(confirm("請認提交？")){
                    let formdata = new FormData();
                    this.show=false;
                    for(obs in this.obj){
                        if(this.obj[obs].pro==this.subtitle){
                            this.obj[obs].state='審核中'
                             // 資料創建
                            console.log(this.obj[obs].pro)
                            console.log(this.link)
                            formdata.append('pro', this.obj[obs].pro);
                            formdata.append('link', this.link);
                        }
                    }
                    // 開始fetch
                    this.sending = true;
                    console.log("send");
                    var config = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                    };
                    fetch('https://script.google.com/macros/s/AKfycbxe54eziz6Jj4Oz5EJu-KigRkb8zwlpVzoBrYJ3KFK6lg8if1gIzzQD0PeCyH-IXkzsxg/exec', config)
                    .then(response => response.text())
                    .then(result => {
                        if(result === 'success') {
                        this.sending = false;
                        console.log(result);
                        }    
                    })
                    .catch(error => console.log('error', error));


                }   

            },
            getData(){ // 可行
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch('https://script.google.com/macros/s/AKfycbw1WTf3nID5xaUBb7KiKuNq8XZEjkHETADy_ZVKuhsbDgYBtqG5HqIykEZPBPVSm5Y/exec', config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  for(key in data){
                    if(data[key].pro==""){

                    }
                    else{
                        this.obj.push(data[key]);
                        this.point=parseInt(data[key].point)
                    }
                  }
                })
                .catch(error => console.log('error', error));
                
            },
            close(){
                this.show=false
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