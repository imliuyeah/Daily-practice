// 头部搜索框ui开始
$.fn.UiSearh = function(){
	$(".ui_search").click(function(){
		$(".ui_search_select_list",this).toggleClass("togglediv");
		$(".ui_search_select_list",this).find("a").click(function(){
			$(".ui_search_select").text($(this).text());
		});
		return false;
	});
	$("body").on("click",function(){
		$(".ui_search_select_list").removeClass("togglediv");
	});
};
// 头部搜索框ui结束

// 导航全部科室ui开始

	/*
	  tabs:鼠标移入时需要切换的主列表
	*/
$.fn.sliderTab = function(list , listinfo){
	$(list).on("mouseenter" , function(){
		$(listinfo , this).show();
	});
	$(list).on("mouseleave" , function(){
		$(listinfo , this).hide();
	});
};
// 导航全部科室ui结束

$(function () {

	$(this).UiSearh();

	$(this).sliderTab(".ui_menu_list_inner" , ".ui_menu_list_info");
	$(this).sliderTab(".ui_menu_list_outer" , ".ui_menu_list_info");

	// 广告幻灯片部分开始
	var index = 0;
	var imgBox = $(".banner_slider_content_box");
	// 将第一张图片复制一份到图片列表的最后
	$(".banner_slider_content_img").eq(0).clone(true).appendTo(imgBox);
	/*定义数组保存幻灯片里的所有图片*/
	var imgArr = $(".banner_slider_content_img");
	var length = imgArr.length;
	var imgWidth = $(".banner_slider_content_img").width();

	// 定时器
	function Timer(){
		intervalID = setInterval(autoSlider, 2000, function(){
			clearInterval(intervalID)
		})
	}
	// 关闭定时器
	function stopSlider(){
		clearInterval(intervalID)
	}
	Timer()
	activeBtn()
	// 开启轮播
	function autoSlider(){
		if(index >= (length - 1)){
			imgBox.css({"left": "0"})
			index = 0
		}else{
			index ++
			var step = -imgWidth * index + "px"
		}
		imgBox.stop().animate({"left": step}, 1000)
		activeBtn()
	};
	// 鼠标进入时，关闭定时器停止自动轮播
	imgBox.mouseenter(function(){
		stopSlider()
	})
	// 鼠标离开时，打开定时器继续自动轮播
	imgBox.mouseleave(function(){
		Timer()
	})
	$(".arrow_left").click(function(){
		stopSlider()
		index --
		if(index < 0){
			index = length - 2 
		}
		imgBox.stop().css({"left" : -imgWidth * index})
		activeBtn()
	})
	$(".arrow_right").click(function(){
		stopSlider()
		index ++
		if(index >= (length - 1)){
			index = 0
		}
		imgBox.stop().css({"left" : -imgWidth * index})
		activeBtn()
	})
	function activeBtn(){
		$(".banner_slider_process span").eq(index).addClass("active").siblings().removeClass("active")
		console.log($(".banner_slider_process span"))
	}
})