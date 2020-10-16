<?php
class JapanHolidays extends CommonHolidays {
	const HolidayList = [
		'Holidays' => [
			// 休日名			月,日,種,振, 開始,終了,無効, 例外配列
			['.元日',			 1, 1, 0, 1,  1948,    0,    0, 0],   // 
			['.成人の日',		 1,15, 0, 1,  1949, 1999,    0, 0],   // 
			['.成人の日',		 1, 2, 3, 0,  2000,    0,    0, 0],   // 
			['.建国記念の日',	 2,11, 0, 1,  1967,    0,    0, 0],   // 
			['.天皇誕生日',		 2,23, 0, 1,  2020,    0,    0, 0],   // 
			['.春分の日',		 3, 1, 1, 1,  1948,    0,    0, 0],   // 
			['.天皇誕生日',   	 4,29, 0, 1,  1949, 1989,    0, 0],   // 
			['.みどりの日',		 4,29, 0, 1,  1990, 2006,    0, 0],   // 
			['.昭和の日',		 4,29, 0, 1,  2007,    0,    0, 0],   // 
			['.憲法記念日',		 5, 3, 0, 1,  1948,    0,    0, 0],   // 
			['.国民の休日',		 5, 4, 0, 0,  1988, 2006,    0, 0],   // 
			['.みどりの日',		 5, 4, 0, 0,  2007,    0,    0, 0],   // 
			['.こどもの日',		 5, 5, 0, 1,  1948,    0,    0, 0],   // 
			['.海の日',			 7,20, 0, 1,  1996, 2002,    0, 0],   // 
			['.海の日',			 7, 3, 3, 0,  2003,    0,    0,[ 2020 => '7/23', ] ],   // 東京オリンピック特別
			['.山の日',			 8,11, 0, 1,  2016,    0,    0,[ 2020 => '8/10', ] ],   // 東京オリンピック特別
			['.敬老の日',		 9,15, 0, 1,  1966, 2002,    0, 0],   // 
			['.敬老の日',		 9, 3, 3, 0,  2003,    0,    0, 0],   // 
			['.秋分の日',		 9, 2, 2, 1,  1948,    0,    0, 0],   // 
			['.体育の日',		10,10, 0, 1,  1966, 1999,    0, 0],   // 
			['.体育の日',		10, 2, 3, 0,  2000, 2019,    0, 0],   // 
			['.スポーツの日',	10, 2, 3, 0,  2020,    0,    0,[ 2020 => '7/24', ] ],   // 東京オリンピック特別 
			['.文化の日',		11, 3, 0, 1,  1948,    0,    0, 0],   // 
			['.勤労感謝の日',	11,23, 0, 1,  1948,    0,    0, 0],   // 
			['.天皇誕生日',		12,23, 0, 1,  1989, 2018,    0, 0],   // 
			// 年末年始(年またぎになるのでこちらで定義)
			['.年末休業',		12,30, 0, 0,  1989,    0,    0, 0],   // 
			['.年末休業',		12,31, 0, 0,  1989,    0,    0, 0],   // 
			['.年始休業',		 1, 2, 0, 0,  1989,    0,    0, 0],   // 
			['.年始休業',		 1, 3, 0, 0,  1989,    0,    0, 0],   // 
			//以下、1年だけの祝日
			['.皇太子明仁親王の結婚の儀',	 4, 10, 0, 1, 1959, 1959,  0, 0],   // 
			['.昭和天皇の大喪の礼',			 2, 24, 0, 1, 1989, 1989,  0, 0],   // 
			['.即位礼正殿の儀',				11, 12, 0, 1, 1990, 1990,  0, 0],   // 
			['.皇太子徳仁親王の結婚の儀',	 6,  9, 0, 1, 1993, 1993,  0, 0],   // 
			['.天皇の即位の日', 				 5,  1, 0, 1, 2019, 2019,  0, 0],   // 
			['.即位礼正殿の儀',				10, 22, 0, 1, 2019, 2019,  0, 0],   // 
		],
		'Vacations' => [		// 連続休日
			// 休日名		月,日,日数,該当年,無効
			['.夏期休業',	 7,28, 5,  2014,   0],
			['.夏期休業',	 7,27, 5,  2015,   0],
			['.夏期休業',	 8, 1, 5,  2016,   0],
			['.夏期休業',	 7,31, 5,  2017,   0],
			['.夏期休業',	 7,30, 5,  2018,   0],
			['.夏期休業',	 7,29, 5,  2019,   0],
			['.夏期休業',	 8, 3, 5,  2020,   0],
		],
	];
//==============================================================================
// コンストラクタ
	function __construct(){
		parent::__construct(self::HolidayList,range(2020,2025));
	}
}
