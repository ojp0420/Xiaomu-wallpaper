<!-- 年/月/日/时/分：2022/6/4/23/20 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
	<!-- 一级路由出口 -->
	<!--      <router-view class="h-screen fixed top-0 left-0 w-screen"></router-view>-->

	<div class="h-screen fixed top-0 left-0 w-screen">
		<m-transition-router-view :routerType="$store.getters.routerType" mainComponentName="home">
		</m-transition-router-view>
	</div>

</template>


<script setup>

</script>
