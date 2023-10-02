// console.log("SW.js")
//todos los archivos de la app propios
const STATIC = "staticv1";
const INMUTABLE = "inmutablev1";
const DYNAMIC = "dynamic1";
const APP_SHELL = [
        '/',
        '/index.html',
        'img/gradutation.jpg',
        'js/app.js',
        'css/style.css',
    ];
    
    const APP_SHELL_INMUTABLE =[
        'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    ];
    
    
    self.addEventListener('install', (e) => {
        console.log("Instalando...")
        const staticCache = caches.open(STATIC).then((Cache) =>{
            caches.addAll(APP_SHELL);
        });
        const inmutableCache = caches.open(INMUTABLE).then((Cache) =>{
            caches.addAll(APP_SHELL);
        });
        e.waitUntil(Promise.all([staticCache,inmutableCache]));
        e.skipWaiting();
    });
    
    self.addEventListener('activate', (e) => {
        console.log("Activado")
    });
    
    self.addEventListener('fetch', (e)=>{
        //3.NetWork with cache fallback
            const source = fetch(e.request)
            .then(res =>{
                if(!res) throw Error("NotFound");
                caches.open(DYNAMIC).then(cache=>{
                    cache.put(e.request,res);
                });
                return res.clone();
            }).catch(res=>{
                return caches.match(e.request);
            })
        //2. Cache with networkp fallback
        // const source = caches.match(e.resquest)
        // .then( res => {
        //     if(res) return res;
        //     return fetch(e.resquest).then(resFetch=>{
        //         caches.open(DYNAMIC).then(cache =>{
        //             cache.put();
        //         });
        //         return resFetch.clone();
        //     })
        // })
        // e.respondWith(source)
        //1, Cache Only
        //e.respondWith(caches.match(e.resquest));
    });
