<template>
  <div ref="content"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  mounted() {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      45, // 角度
      window.innerWidth/window.innerHeight, // 宽高比
      1, // 最近距离
      1000 // 最远距离
    )
    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xeeeeee)
    renderer.shadowMap.enabled = true // 打开阴影
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    const axes = new THREE.AxesHelper(40)
    scene.add(axes)

    // 添加平面几何体
    this.createPlane(scene)
    // 添加立方体
    this.createBox(scene)
    // 添加球体
    this.createSphere(scene)
    this.setUpSpotLight(scene)
    this.setUpFog(scene)

    this.$refs.content.appendChild(renderer.domElement)
    renderer.render(scene, camera)
  },
  methods: {
    // 绘制平面几何体
    createPlane(scene) {
      /* 
        基础材质 MeshBasicMaterial 不加入光源能看到材质颜色
        反向材质 MeshLambertMaterial 不加入光源不能显示材质颜色
        若平面接收阴影则材质必须是 MeshLambertMaterial
      */
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshLambertMaterial({
          color: 0xdbd8de
        })
      )

      plane.rotateX(-0.5 * Math.PI)
      plane.position.y = -5
      plane.receiveShadow = true // 使其平面接收阴影
      scene.add(plane)
    },
    // 绘制立方体
    createBox(scene) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({
          color: 0xb72c2c
        })
      )
      box.position.x = 40
      box.castShadow = true
      scene.add(box)
    },
    // 绘制球体
    createSphere(scene) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(10, 10, 10), // 半径 x轴分几份 y轴分几份
        new THREE.MeshBasicMaterial({
          color: 0x712ebc,
          wireframe: true
        })
      )

      sphere.position.set(0, 0, 40)
      scene.add(sphere)
    },
    // 设置聚光灯光源
    setUpSpotLight(scene) {
      const spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      spotLight.castShadow = true // 设置光源可以生成阴影
      scene.add(spotLight)
    },
    // 设置雾化效果
    setUpFog(scene) {
      // 开启雾化效果
      scene.fog = new THREE.Fog(0xffffff, 1, 200)
      // 所有物体使用同一种材质
      // scene.overrideMaterial = new THREE.MeshLambertMaterial({
      //   color: 0xffffff
      // })
    }
  }
}
</script>
