	//yo: load GLTF model
    //import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
    
    //import { OrbitControls } from '../lib/OrbitControls.js'
    //import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader.js';
    import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
    import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
    //import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';

     //load 3d model
        const loader = new GLTFLoader();
        //const loader = new FBXLoader();
        //loader.load( '../assets/model/1216PUMP.glb', function ( gltf ) {
           loader.load( '../assets/model/uploads_files_2396630_Chainsaw01.gltf', function ( gltf ) {
           //loader.load( '../assets/model/uploads_files_2405461_AG1.FBX', function ( gltf ) {
            //object.scale.multiplyScalar(.1);    // 縮放模型大小
            
            scene.add( gltf.scene ); // 將模型引入three
            
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );

        let renderer, scene, camera
        let cameraControl, stats
        let cube
        let sprite1,sprite2,sprite3;
        let mesh;
        let spriteBehindObject1,spriteBehindObject2,spriteBehindObject3;
        const annotation1 = document.querySelector(".annotation1");
        const annotation2 = document.querySelector(".annotation2");
        const annotation3 = document.querySelector(".annotation3");
        // 畫面初始化
        function init() {

          
          scene = new THREE.Scene()
        
          // 相機設定
         // camera = new THREE.PerspectiveCamera(
          //  1, //數值越小: 越拉近物體，物體越大 (zoom in)
          //  window.innerWidth / window.innerHeight,
          //  0.1,
          //  1000
         // )
          //camera.position.set(30, 30, 30)
          //camera.lookAt(scene.position)
        
          //let axes = new THREE.AxesHelper(20)
          // scene.add(axes)
        
             // Camera
 
            //camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
            //camera.position.x = 750;
            //camera.position.y = 500;
            //camera.position.z = 1250;

            camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = 30;
            camera.position.y = 30;
            camera.position.z = 30;

          //stats = initStats()
        
          // Sprite

          const numberTexture1 = new THREE.CanvasTexture(
            document.querySelector("#number1")
            );
          const numberTexture2 = new THREE.CanvasTexture(
            document.querySelector("#number2")
            );
          const numberTexture3 = new THREE.CanvasTexture(
            document.querySelector("#number3")
            );
            const spriteMaterial1 = new THREE.SpriteMaterial({
              map: numberTexture1,
              alphaTest: 0.5,
              transparent: true,
              depthTest: false,
              depthWrite: false });
            const spriteMaterial2 = new THREE.SpriteMaterial({
              map: numberTexture2,
              alphaTest: 0.5,
              transparent: true,
              depthTest: false,
              depthWrite: false });
            const spriteMaterial3 = new THREE.SpriteMaterial({
              map: numberTexture3,
              alphaTest: 0.5,
              transparent: true,
              depthTest: false,
              depthWrite: false });

            sprite1 = new THREE.Sprite(spriteMaterial1);
            sprite1.position.set(-1, -1, 2);
            //sprite.position.set(250, 250, 250);
            sprite1.scale.set(10, 10, 1);
            //sprite.scale.set(60, 60, 1);

            scene.add(sprite1);

            sprite2 = new THREE.Sprite(spriteMaterial2);
            sprite2.position.set(-1, -1, 2);
            //sprite.position.set(250, 250, 250);
            sprite2.scale.set(10, 10, 1);
            //sprite.scale.set(60, 60, 1);

            scene.add(sprite2);

            sprite3 = new THREE.Sprite(spriteMaterial3);
            sprite3.position.set(-1, -1, 2);
            //sprite.position.set(250, 250, 250);
            sprite3.scale.set(10, 10, 1);
            //sprite.scale.set(60, 60, 1);

            scene.add(sprite3);
          // 渲染器設定
          renderer = new THREE.WebGLRenderer({ antialias: true })
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.outputEncoding = THREE.sRGBEncoding //yo: 調整為較亮的Gamma值。 (12/06) 
          //renderer.textureEncoding= THREE.sRGBEncoding
          renderer.setClearColor(0x333333, 1);
          document.body.appendChild(renderer.domElement);

        
          // 建立 OrbitControls
          cameraControl = new OrbitControls(camera, renderer.domElement)
          cameraControl.enableDamping = true // 啟用阻尼效果
          cameraControl.dampingFactor = 0.25 // 阻尼系數
          cameraControl.autoRotate = true // 啟用自動旋轉
          //cameraControl.enableZoom = false // 關閉zoom功能
          
        
          // 簡單的地板
          /*const planeGeometry = new THREE.PlaneGeometry(60, 60)
          const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
          let plane = new THREE.Mesh(planeGeometry, planeMaterial)
          plane.rotation.x = -0.5 * Math.PI
          plane.position.set(0, -7, 0)
          scene.add(plane)*/

          //let ambientLight = new THREE.AmbientLight(0x404040) // soft white light
          let ambientLight = new THREE.AmbientLight(0xffffff)
          scene.add(ambientLight)

          // 簡單的 spotlight 照亮物體
          let spotLight = new THREE.SpotLight(0x404040, 15, 250)
          spotLight.position.set(-10, 20, 20)
          scene.add(spotLight)
          //yo: 再增加一個spotlight，以補足暗部 (12/06)
          let spotLight1 = new THREE.SpotLight(0x404040, 15, 250)
          spotLight1.position.set(10, -20, -20)
          scene.add(spotLight1)
         
        // 建立物體 (紫色小球)
          //const button = makeElementObject('button', 75, 20) 
          const geometry = new THREE.SphereGeometry(0.02) // 幾何體
          const material = new THREE.MeshPhongMaterial({
          color: 0xFF00FF
          }) // 材質
          cube = new THREE.Mesh(geometry, material) // 建立網格物件
          //cube.rotation.y = -Math.PI * .5 
          cube.position.set(-0.1, -0.1, 0.2)
          //scene.add(cube)

          // Mesh
 
          const cubeGeometry = new THREE.BoxGeometry(0.4, 0.4, 1);
          //const cubeGeometry = new THREE.BoxGeometry(500, 500, 500);
            mesh = new THREE.Mesh(
            cubeGeometry,
            new THREE.MeshPhongMaterial({
              color: 0x156289,
              emissive: 0x072534,
              side: THREE.DoubleSide,
              shading: THREE.FlatShading, 
              transparent: true }));
          
              //mesh.position.set(-1, -1, 2)
              mesh.position.set(0, 0, 0) //文字透明度是用mesh的距離算出來的，所以mesh的原點與大小需要與model一致，mesh可以不用顯示出來沒關係
          
            const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(cubeGeometry),
            new THREE.LineBasicMaterial({
              color: 0x00ff00,
              linewidth: 1,
              opacity: 0.25,
              transparent: true }));
                
            //scene.add(mesh);
            //scene.add(line);

          window.addEventListener("resize", onWindowResize, false);
         
          // 將渲染出來的畫面放到網頁上的 DOM
          document.body.appendChild(renderer.domElement)
        }

        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        function animate() {
          requestAnimationFrame(animate);
          cameraControl.update();
          render();
        }
        

        function render() {
          //stats.update()
          //requestAnimationFrame(render)
          //cameraControl.update()
          renderer.render(scene, camera)
          updateAnnotationOpacity();
          updateScreenPosition();
        }
 
        
        function updateAnnotationOpacity() {
          const meshDistance1 = camera.position.distanceTo(mesh.position);
          const spriteDistance1 = camera.position.distanceTo(sprite1.position);
          spriteBehindObject1 = spriteDistance1 > meshDistance1;
          sprite1.material.opacity = spriteBehindObject1 ? 0.25 : 1;
        
          // Do you want a number that changes size according to its position?
          // Comment out the following line and the `::before` pseudo-element.
          sprite1.material.opacity = 0;

          const meshDistance2 = camera.position.distanceTo(mesh.position);
          const spriteDistance2 = camera.position.distanceTo(sprite2.position);
          spriteBehindObject2 = spriteDistance2 > meshDistance2;
          sprite2.material.opacity = spriteBehindObject2 ? 0.25 : 1;
        
          // Do you want a number that changes size according to its position?
          // Comment out the following line and the `::before` pseudo-element.
          sprite2.material.opacity = 0;

          const meshDistance3 = camera.position.distanceTo(mesh.position);
          const spriteDistance3 = camera.position.distanceTo(sprite3.position);
          spriteBehindObject3 = spriteDistance3 > meshDistance3;
          sprite3.material.opacity = spriteBehindObject3 ? 0.25 : 1;
        
          // Do you want a number that changes size according to its position?
          // Comment out the following line and the `::before` pseudo-element.
          sprite3.material.opacity = 0;
        }
        
        function updateScreenPosition() {
          const vector1 = new THREE.Vector3(-0.1, 0, 0.5);//Chain saw
          //const vector2 = new THREE.Vector3(-0.08, 0.2, 0);//ON/OFF Switch
          //const vector3 = new THREE.Vector3(0.09, -0.02, -0.32);//Fuel
          //const vector = new THREE.Vector3(250, 250, 250);
          const canvas1 = renderer.domElement;
          vector1.project(camera);
          vector1.x = Math.round((0.5 + vector1.x / 2) * (canvas1.width / window.devicePixelRatio));
          vector1.y = Math.round((0.5 - vector1.y / 2) * (canvas1.height / window.devicePixelRatio));
          annotation1.style.top = `${vector1.y}px`;
          annotation1.style.left = `${vector1.x}px`;
          //annotation1.style.opacity = spriteBehindObject1 ? 0.25 : 1; //文字轉到背景後呈現透明

          //const vector1 = new THREE.Vector3(-0.1, 0, 0.5);//Chain saw
          const vector2 = new THREE.Vector3(-0.08, 0.2, 0);//ON/OFF Switch
          //const vector3 = new THREE.Vector3(0.09, -0.02, -0.32);//Fuel
          //const vector = new THREE.Vector3(250, 250, 250);
          const canvas2 = renderer.domElement;
          vector2.project(camera);
          vector2.x = Math.round((0.5 + vector2.x / 2) * (canvas2.width / window.devicePixelRatio));
          vector2.y = Math.round((0.5 - vector2.y / 2) * (canvas2.height / window.devicePixelRatio));
          annotation2.style.top = `${vector2.y}px`;
          annotation2.style.left = `${vector2.x}px`;
          //annotation2.style.opacity = spriteBehindObject2 ? 0.25 : 1;

          //const vector1 = new THREE.Vector3(-0.1, 0, 0.5);//Chain saw
          //const vector2 = new THREE.Vector3(-0.08, 0.2, 0);//ON/OFF Switch
          const vector3 = new THREE.Vector3(0.09, -0.02, -0.32);//Fuel
          //const vector = new THREE.Vector3(250, 250, 250);
          const canvas3 = renderer.domElement;
          vector3.project(camera);
          vector3.x = Math.round((0.5 + vector3.x / 2) * (canvas3.width / window.devicePixelRatio));
          vector3.y = Math.round((0.5 - vector3.y / 2) * (canvas3.height / window.devicePixelRatio));
          annotation3.style.top = `${vector3.y}px`;
          annotation3.style.left = `${vector3.x}px`;
          //annotation3.style.opacity = spriteBehindObject3 ? 0.25 : 1;
        }

          
        init()
        animate()

       
        