.blogHeader => [
+jquery => ~
	$('#admin_login').click(function() {
        var flip_url = { Admin:"index",Index:"admin"};
		var url = '/blog/'+flip_url["${$controller$}"];
		location.href = url;
	});
~
h1.logo-head => [ %${#.BLOGTITLE} => /sample/${$controller$}/ ]

// 言語スイッチ
.lang-switch => [
	style => [
		position:fixed;
		top:10px;
		right:50px;
		width:5em;
		background-color:yellow;
		text-align:center;
	]
	?${'Login.LANG'} => [
	'en*' => [ %link => [ 日本語 => "?lang=ja" ] ]
	'|ja*' => [ %link => [ Englisth => "?lang=en" ] ]
	]
]
// 本体は Footer.tpl に定義
span.button#about_info => [ 
	style => [
		position:fixed;
		top:60px;
		left:185px;
	]
	"About"
]

]
