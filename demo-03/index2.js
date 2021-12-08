	//yo: load GLTF model
    //import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
    //import { OrbitControls } from '../lib/OrbitControls.js'
    //import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader.js';
    import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
    import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

     //load 3d model
        const loader = new GLTFLoader();
            //loader.load( '../assets/model/uploads_files_3217890_Pump_GLB.glb', function ( gltf ) {
            loader.load( '../assets/model/uploads_files_2396630_Chainsaw01.gltf', function ( gltf ) {
           //loader.load( '../assets/model/untitled_0011.glb', function ( gltf ) {
            scene.add( gltf.scene );
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );



        let renderer, scene, camera
        let cameraControl, stats
        let cube
        //let creeperObj
        
        
        
        function initStats() {
          const stats = new Stats()
          stats.setMode(0)
          document.getElementById('stats').appendChild(stats.domElement)
          return stats
        }
        
        // 畫面初始化
        function init() {
          scene = new THREE.Scene()
        
          // 相機設定
          camera = new THREE.PerspectiveCamera(
            6, //數值越小: 越拉近物體，物體越大 (zoom in)
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          )
          camera.position.set(30, 30, 30)
          camera.lookAt(scene.position)
        
          let axes = new THREE.AxesHelper(20)
          // scene.add(axes)
        
          stats = initStats()
        
          // 渲染器設定
          renderer = new THREE.WebGLRenderer()
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.outputEncoding = THREE.sRGBEncoding //yo: 調整為較亮的Gamma值。 (12/06) 
          //renderer.textureEncoding= THREE.sRGBEncoding
        
          // 建立 OrbitControls
          cameraControl = new OrbitControls(camera, renderer.domElement)
          cameraControl.enableDamping = true // 啟用阻尼效果
          cameraControl.dampingFactor = 0.25 // 阻尼系數
          // cameraControl.autoRotate = true // 啟用自動旋轉
        
          // 簡單的地板
          const planeGeometry = new THREE.PlaneGeometry(60, 60)
          const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
          let plane = new THREE.Mesh(planeGeometry, planeMaterial)
          plane.rotation.x = -0.5 * Math.PI
          plane.position.set(0, -7, 0)
          //scene.add(plane)
        
         
        
          //let ambientLight = new THREE.AmbientLight(0x404040) // soft white light
          let ambientLight = new THREE.AmbientLight(0xffffff)
          scene.add(ambientLight)
         

          // 設置平行光 DirectionalLight
          //let directionalLight = new THREE.DirectionalLight(0xffffff)
          //directionalLight.position.set(-10, 20, 20)
          //directionalLight.castShadow = true
          //scene.add(directionalLight)
          //let directionalLightHelper = new THREE.DirectionalLightHelper(
          //directionalLight
          //)
          //scene.add(directionalLightHelper)
          
          // 設置點光源 PointLight
          //let pointLight = new THREE.PointLight(0xffffff)
          //pointLight.position.set(-10, 20, 20)
          //pointLight.castShadow = true
          //scene.add(pointLight)
          //let pointLightHelper = new THREE.PointLightHelper(pointLight)
          //scene.add(pointLightHelper)

          // 簡單的 spotlight 照亮物體
          let spotLight = new THREE.SpotLight(0x404040, 15, 250)
          spotLight.position.set(-10, 20, 20)
          scene.add(spotLight)
          //yo: 再增加一個spotlight，以補足暗部 (12/06)
          let spotLight1 = new THREE.SpotLight(0x404040, 15, 250)
          spotLight1.position.set(10, -20, -20)
          scene.add(spotLight1)
          //let spotHelper = new THREE.SpotLightHelper(spotLight)
          //scene.add(spotHelper)

          //const button = makeElementObject('button', 75, 20)    
          //button.css3dObject.element.style.border = '1px solid orange'
          //button.css3dObject.element.textContent = "Click me!"
          //button.css3dObject.element.addEventListener('click', () => alert('Button clicked!'))
          // button.position.y = 10
          //button.position.z = 10
          // background.add(button)

          /*const geometry = new THREE.Geometry() // 先宣告一個空的幾何體
          const material = new THREE.PointsMaterial({
            size: 4,
            color: 0xff00ff
          }) // 利用 PointsMaterial 決定材質
        
          for (let x = -5; x < 5; x++) {
            for (let y = -5; y < 5; y++) {
              const point = new THREE.Vector3(x * 10, y * 10, 0) // 每一個粒子為一個 Vector3 頂點物件
              geometry.vertices.push(point)
            }
          }
        
          let points = new THREE.Points(geometry, material) // 用前面的幾何體與材質建立一個粒子系統
          points.position.set(-45, 0, 0)
          scene.add(points)*/
        // 建立物體
          //const button = makeElementObject('button', 75, 20) 
          const geometry = new THREE.SphereGeometry(0.1) // 幾何體
          const material = new THREE.MeshPhongMaterial({
          color: 0xFF00FF
          }) // 材質
          cube = new THREE.Mesh(geometry, material) // 建立網格物件
          //cube.rotation.y = -Math.PI * .5 
          cube.position.set(1, 0, -2)
          scene.add(cube)

          //const loader = new FontLoader();

          //loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
          
            //const geometry = new TextGeometry( 'Hello three.js!', {
              //font: font,
              //size: 80,
              //height: 5,
             // curveSegments: 12,
             // bevelEnabled: true,
             // bevelThickness: 10,
             // bevelSize: 8,
             // bevelOffset: 0,
             // bevelSegments: 5
           // } );
        //  } );



          // 將渲染出來的畫面放到網頁上的 DOM
          document.body.appendChild(renderer.domElement)
        }
        
        function render() {
          stats.update()
          requestAnimationFrame(render)
          cameraControl.update()
          renderer.render(scene, camera)
        }
        
        window.addEventListener('resize', function() {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        })
        /*
        function makeElementObject(type, width, height) {
          const obj = new THREE.Object3D
      
          const element = document.createElement( type );
          element.style.width = width+'px';
          element.style.height = height+'px';
          element.style.opacity = 0.999;
          element.style.background = new THREE.Color(
              Math.random() * 0.21568627451 + 0.462745098039,
              Math.random() * 0.21568627451 + 0.462745098039,
              Math.random() * 0.21568627451 + 0.462745098039,
          ).getStyle();
      
      
          var css3dObject = new THREE.CSS3DObject( element );
          obj.css3dObject = css3dObject
          obj.add(css3dObject)
      
          // make an invisible plane for the DOM element to chop
          // clip a WebGL geometry with it.
          var material = new THREE.MeshPhongMaterial({
              opacity	: 0.15,
              color	: new THREE.Color( 0x111111 ),
              blending: THREE.NoBlending,
              side	: THREE.DoubleSide,
          });
          var geometry = new THREE.BoxGeometry( width, height, 1 );
          var mesh = new THREE.Mesh( geometry, material );
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          obj.lightShadowMesh = mesh
          obj.add( mesh );
      
          return obj
      }*/

          
        init()
        render()
        
       
        
