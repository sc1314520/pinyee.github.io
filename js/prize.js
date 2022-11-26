window.onload=function(){
    const vm = new Vue({
        el:'#form2',
        data:{
            obj:[],
            subtitle:'',
            link:'',
            show:false,
            point:0,
            sending:false, 
            apiUrl:'https://script.google.com/macros/s/AKfycbzCXQ1M9suK8ulm5Wzz4v6r346OG3C1QWcfc6YYBF7bUJVk8bgnx0YAI1YZgDGfSGg/exec'
        },
        methods:{
            go(items){
                this.subtitle=items.pro;
                this.show=true;
            },
            submit(){ // 待解決
                if(confirm("請認提交？")){
                    this.show=false;
                    for(obs in this.obj){
                        console.log(this.obj[obs])
                        if(this.obj[obs].pro==this.subtitle){
                            this.obj[obs].state='審核中'
                        }
                    }
                    
                    // 開始fetch
                    this.sending = true;
                    console.log("send");

                    // 資料創建
                    let formdata = new FormData();
                    formdata.append('pro', this.subtitle);
                    formdata.append('link', this.link);

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
                  console.log(data)
                  for(key in data){
                    this.obj.push(data[key]);
                    this.point=data[key].point
                  }
                })
                .catch(error => console.log('error', error));
                
            },
            close(){
                this.show=false
            }
        }
    });
    vm.getData();
}