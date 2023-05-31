/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2018 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 *
 * Don't forget to prefix your containers with your own identifier
 * to avoid any conflicts with others containers.
 */


$(function() {

    var loanding = "<p class='loanding'></p>";
    var content_result = "<div id='wbsearch_content_result' style='min-height:500px'><a href='javascript:void(0)' id='close_search_query_nav'><span>" + close_text + "</span></a><div id='wbsearch_data'  class='wb-container'></div></div>";
    $(content_result).insertAfter("#search_block_top");

    $('#search_query_nav').click(function() {
        //$('body,html').animate({scrollTop:0},300);
        $("#search_block_top").addClass('show');
    });

    $('#close_search_query_nav').click(function() {
        $('#wbsearch_content_result').slideUp(300);
        $("#search_block_top").removeClass('show');
        //$('body').removeClass('fixed');
    });



    $('#searchbox input.search_query').keyup(function() {
        $('.ac_results').remove();
        $('#wbsearch_data').html(loanding);
        $('#wbsearch_content_result').slideDown(400);
        if (this.value.length < 3)
            $('#wbsearch_data').html(limit_character);
        else {
            var id_cat = $('#search_category').val();
            doLiveSearch(this.value, id_cat);
        }

    });

    function checkIfShouldOpen() {
        var check = checkIfAllEmpty();
        var value = getFieldsValue();
        console.log(value);
        var fullcheck = checkIfAllFull();

        if (fullcheck) {
            $('#topSearchButton').prop('disabled', false);
        } else {
            $('#topSearchButton').prop('disabled', true);
        }

        if (check && $('#detailsBox').hasClass('searchDetailsHidden')) {
            $('#detailsBox').removeClass('searchDetailsHidden');
            $('#detailsBox').addClass('searchDetailsDisplayed');
        } else if (!check && $('#detailsBox').hasClass('searchDetailsDisplayed')) {
            $('#detailsBox').removeClass('searchDetailsDisplayed');
            $('#detailsBox').addClass('searchDetailsHidden');
        }
    }

    $('.searchInput').on('input', function() {
        checkIfShouldOpen();
    })

    // $(document).ready(function() {
    //     $(".owl-carousel").owlCarousel();
    // });

    $('.searchInput').click(function() {
        checkIfShouldOpen();
    })

    $('#topSearchButton').click(function(){
        var fullcheck = checkIfAllFull();
        if(fullcheck){
             $('.boxSearchLoading').toggleClass('hidden');
        }
    })

    $('#checkMailingBox').click(function() {

        $(this).parent().toggleClass('selectedCheckbox');
        $(this).siblings('#mailingBoxBlack').toggleClass('hidden');
        $(this).siblings('#mailingBoxWhite').toggleClass('hidden');


    });

    $('#checkStorageBox').click(function() {

        $(this).parent().toggleClass('selectedCheckbox');
        $(this).siblings('#storageBoxBlack').toggleClass('hidden');
        $(this).siblings('#storageBoxWhite').toggleClass('hidden');

    });

    $('#checkFoamLinedBox').click(function() {

        $(this).parent().toggleClass('selectedCheckbox');
        $(this).siblings('#foamLinedBoxBlack').toggleClass('hidden');
        $(this).siblings('#foamLinedBoxWhite').toggleClass('hidden');

    });


    $('#checkMiscBox').click(function() {

        $(this).parent().toggleClass('selectedCheckbox');
        $(this).siblings('#miscBoxBlack').toggleClass('hidden');
        $(this).siblings('#miscBoxWhite').toggleClass('hidden');


    });

    $('#checkShippingBox').click(function() {

        $(this).parent().toggleClass('selectedCheckbox');
        $(this).siblings('#shippingBoxBlack').toggleClass('hidden');
        $(this).siblings('#shippingBoxWhite').toggleClass('hidden');


    });

    $('.closeSizeSearch').click(function() {
        $('#detailsBox').removeClass('searchDetailsDisplayed');
        $('#detailsBox').addClass('searchDetailsHidden');
    })

    $("#search_category").change(function() {
        $('#wbsearch_data').html(loanding);
        if ($('#searchbox input.search_query').val().length < 3) {
            $('#wbsearch_data').html(limit_character);
        } else {
            var id_cat = $('#search_category').val();
            doLiveSearch($('#searchbox input.search_query').val(), id_cat);
        }
    });



});

function checkIfAllEmpty() {
    var check = false;
    $('.searchInput').each(function() {
        if ($(this).val().length) {
            check = true;
        }
    })
    return check;
}

function getFieldsValue() {
    alert('sdadfasf');
    var value = 0;
    $('.searchInput').each(function() {
        if ($(this).val()) {
            value = $(this).val();
        }
    })
    return value;
}

function checkIfAllFull() {
    var check = true;
    $('.searchInput').each(function() {
        if (!$(this).val().length) {
            check = false;
        }
    })

    return check;
}

function doLiveSearch(inputString, id_cat) {

	    $.post(
	        $('#wb_url_ajax_search input.url_ajax').val(), { queryString: inputString, id_Cat: id_cat },
	        function(data) {
	            $('#wbsearch_data').html(data);
	            console.log('test');

			    $('#relevantCatCarousel').owlCarousel({
				    loop:false,
				    margin:10,
				    nav:false,
                    margin:10,
				    dots:true,
                    responsiveBaseElement: '#wbsearch_content_result',
				    responsive:{
				        300:{
				            items:2
				        },
				        550:{
				            items:3
				        },
				        680:{
				            items:4
				        },
                        780:{
                            items:5
                        }
				    }
				})
				$('#relevantProductsCarousel').owlCarousel({
				    loop:false,
				    margin:10,
				    nav:false,
				    dots:true,
				    responsive:{
				        200:{
				            items:1
				        },
				        600:{
				            items:2
				        },
				        1000:{
				            items:2
				        }
				    }
				})
	        });



    /*
    var url =  $('#wb_url_ajax_search input.url_ajax').val()+'?queryString='+inputString+'&id_Cat='+id_cat;
    var ajaxRequest;  // The variable that makes Ajax possible!
    		try{
    			// Opera 8.0+, Firefox, Safari
    			ajaxRequest = new XMLHttpRequest();
    		} catch (e){
    			// Internet Explorer Browsers
    			try{
    				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
    			} catch (e) {
    				try{
    					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
    				} catch (e){
    					// Something went wrong
    					alert("Your browser broke!");
    					return false;
    				}
    			}
    		}
    		// Create a function that will receive data sent from the server
    		ajaxRequest.onreadystatechange = function(){
    			if(ajaxRequest.readyState == 4){
    				//var ajaxDisplay = document.getElementById('#tabs-'+id_tab);
    				//alert(ajaxRequest.responseText);
    				//ajaxDisplay.innerHTML = ajaxRequest.responseText;
    				$('#wbsearch_data').html(ajaxRequest.responseText);
    			}
    		}
    		ajaxRequest.open("GET", url, true);
    		ajaxRequest.send(null); */



    /*
    $.ajax(
    {
    	  method: "POST",
    	 url: $('#wb_url_ajax_search input.url_ajax').val(),
    	 data: { queryString: inputString, id_Cat: id_cat },
    	 success: function(res)
    {
    	$('#wbsearch_data').html(res);
    }
    });*/





}

function Show_All_Search() {
    $("#searchbox").submit();
}