<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64px" height="64px" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper"></div>

<!-- 		<table>
			<input v-model="seller.avatar">
			<p>{{seller.avatar}}</p>
			<tr v-for="item in seller.infos">
				<td>{{item}}</td>
			</tr>
		</table> -->
	</div>
</template>

<script type="text/javascript">
export default{
	props: ['seller'],
	created() {
		console.log('in')
	},
	mounted() {
		// console.log(this.seller)
		// console.log(this.seller.data)
	}
}
</script>

<style type="text/css">

</style>