//============================================================================================================
// Levels Script. Contains functions for building each level and data that more than one script needs to use. 
//============================================================================================================

function level1() 
{
	// 10 1  2  3  4 
	// 5  6  7  8  9 
	// 0  11 12 13 14
	// 15 16 17 18 19
	// 20 21 22 23 24
	
	rooms = [];
	rooms[0] = []; 
	rooms[0][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[0][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[0][2] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[0][3] =  [9  ,4  ,96 ,97 ,96 ,97 ,96 ,97 ,96 ,97 ,96 ,97 ,96 ,97 ,4  ,8  ];
	rooms[0][4] =  [7  ,0  ,98, 99 ,98, 99 ,98, 99 ,98, 99 ,98, 99 ,98, 99 ,0  ,5  ];
	rooms[0][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:11, dir:2, px:66, py:400}];//11
	rooms[0][6] =  [7  ,68 ,108,109,108,109,108,109,108,109,108,109,108,109,0  ,5  ];
	rooms[0][7] =  [10 ,6  ,110,111,110,111,110,111,110,111,110,111,110,111,6  ,11 ];
	rooms[0][8] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[0][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[0][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[1] = [];
	rooms[1][0] =  [9  ,16 ,64 ,64 ,64 ,64 ,64 ,64 ,66 ,66 ,66 ,66 ,66 ,66 ,16 ,8  ];
	rooms[1][1] =  [7  ,{ID:"st", n:1, t:17, s1:2,s2:1,s3:17},65 ,65 ,65 ,65 ,65 ,65 ,67 ,67 ,67 ,67 ,67 ,67 ,{ID:"st", n:2, t:17,s1:0,s2:3,s3:0},5  ];
	rooms[1][2] =  [7  ,0  ,0  ,68 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[1][3] =  [10 ,6  ,6  ,6  ,6  ,6  ,15 ,0  ,14 ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[1][4] =  [9  ,4  ,16 ,4  ,4  ,4  ,13 ,0  ,12 ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[1][5] =  [7  ,0  ,{ID:"st", n:3, t:17,s1:13,s2:0,s3:2},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:2, dir:2, px:66, py:400}];
	rooms[1][6] =  [7  ,0  ,0  ,0  ,0  ,14 ,15 ,0  ,0  ,0  ,0  ,0  ,0  ,14 ,6  ,11 ];
	rooms[1][7] =  [7  ,69 ,69 ,0  ,0  ,5  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,12 ,56 ,8  ];
	rooms[1][8] =  [7  ,69 ,69 ,0  ,0  ,5  ,7  ,0  ,14 ,15 ,0  ,0  ,0  ,0  ,57 ,5  ];
	rooms[1][9] =  [7  ,69 ,69 ,0  ,0  ,5  ,7  ,0  ,5  ,7  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[1][10] = [10 ,6  ,6  ,6  ,6  ,11 ,10 ,{ID:"dr", dest:6, dir:0, px:480, py:130},11 ,10 ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[2] = [];
	rooms[2][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,9  ,4  ,4  ,8  ];
	rooms[2][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,18 ,{ID:"st", n:4, t:19, s1:0,s2:0,s3:10},0  ,5  ];
	rooms[2][2] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,10 ,15 ,0  ,5  ];
	rooms[2][3] =  [9  ,4  ,96 ,97 ,96 ,97 ,96 ,97 ,96 ,97 ,96 ,97 ,1  ,7  ,0  ,5  ];
	rooms[2][4] =  [7  ,68 ,98, 99 ,98, 99 ,98, 99 ,98, 99 ,98, 99 ,4  ,13 ,0  ,5  ];
	rooms[2][5] =  [{ID:"dr", dest:1, dir:3, px:926, py:400},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0 , 0 , 0 , 5  ];
	rooms[2][6] =  [7  ,0  ,108,109,108,109,108,109,108,109,108,109,108,109,69 ,5  ];
	rooms[2][7] =  [10 ,6  ,110,111,110,111,110,111,110,111,110,111,110,111,6  ,11 ];
	rooms[2][8] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[2][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[2][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[3] = [];
	rooms[3][0] =  [9  ,4  ,4  ,4  ,4  ,24 ,24 ,24 ,4  ,4  ,4  ,4  ,4  ,56 ,56 ,8  ];
	rooms[3][1] =  [7  ,63 ,0  ,54 ,0  ,25 ,25 ,25 ,0  ,0  ,63 ,0  ,0  ,57 ,57 ,5  ];
	rooms[3][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[3][3] =  [7  ,0  ,0  ,14 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,15 ,0  ,0  ,5  ];
	rooms[3][4] =  [7  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[3][5] =  [7  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,{ID:"dr", dest:4, dir:2, px:66, py:400, d:9, col:2}];
	rooms[3][6] =  [7  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,7  ,63 ,0  ,5  ];
	rooms[3][7] =  [7  ,0  ,0  ,12 ,4  ,4  ,4  ,4  ,4  ,8  ,1  ,1  ,10 ,6  ,6  ,11 ];
	rooms[3][8] =  [7  ,0  ,0  ,0  ,0  ,62 ,0  ,62 ,62 ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[3][9] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[3][10] = [10 ,6  ,6  ,6  ,6 , 6  ,6  ,{ID:"dr", dest:8, dir:0, px:480, py:130},6 ,11 ,1  ,1  ,1  ,1  ,1  ,1 ];
	rooms[4] = [];
	rooms[4][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][2] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][3] =  [9  ,112,113,114,115,8  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][4] =  [7  ,116,117,118,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][5] =  [{ID:"dr", dest:3, dir:3, px:926, py:400, d:10},0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][6] =  [10 ,6  ,6  ,6  ,6  ,11 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][7] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][8] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[4][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[5] = [];
	rooms[5][0] =  [9  ,{ID:"dr", dest:10, dir:1, px:96, py:654, d:12},8  ,1  ,1  ,1  ,1  ,1  ,1  ,9  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[5][1] =  [7  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,7  ,63 ,0  ,52 ,53 ,0  ,5  ];
	rooms[5][2] =  [7  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:6, dir:2, px:66, py:208}];
	rooms[5][3] =  [7  ,0  ,12 ,4  ,24 ,24 ,24 ,4  ,4  ,13 ,0  ,0  ,52 ,53 ,0  ,5  ];
	rooms[5][4] =  [7  ,0  ,0  ,0  ,25 ,25 ,25 ,0  ,0  ,0  ,0  ,0  ,52 ,53 ,0  ,5  ];
	rooms[5][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,52 ,53 ,0  ,52 ,53 ,0  ,5  ];
	rooms[5][6] =  [7  ,63 ,0  ,52 ,53 ,0  ,52 ,53 ,0  ,52 ,53 ,0  ,52 ,53 ,0  ,5  ];
	rooms[5][7] =  [7  ,0  ,0  ,0  ,0  ,0  ,54 ,0  ,0  ,0  ,0  ,0  ,54 ,0  ,0  ,5  ];
	rooms[5][8] =  [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[5][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[5][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[6] = [];
	rooms[6][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:1, dir:1, px:480, py:654},4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[6][1] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[6][2] =  [{ID:"dr", dest:5, dir:3, px:926, py:208},0  ,0  ,0  ,0  ,0  ,0  ,0  ,14 ,6  ,6  ,6  ,6  ,15 ,0  ,5  ];
	rooms[6][3] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,7  ,0  ,5  ];
	rooms[6][4] =  [10 ,6  ,6  ,6  ,6  ,6  ,15 ,0  ,5  ,1  ,1  ,1  ,1  ,7  ,0  ,5  ];
	rooms[6][5] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,12 ,4  ,4  ,4  ,4  ,13 ,0  ,5  ];
	rooms[6][6] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[6][7] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,14 ,6  ,6  ,15 ,0  ,0  ,0  ,5  ];
	rooms[6][8] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,5  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ];
	rooms[6][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,5  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ];
	rooms[6][10] = [1  ,1  ,1  ,1  ,1  ,1  ,10 ,{ID:"dr", dest:11, dir:0, px:480, py:130},11 ,1  ,1  ,10 ,6  ,6  ,6  ,11 ];
	rooms[7] = [];
	rooms[7][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][1] =  [1  ,1  ,1  ,1  ,9  ,4  ,4  ,4  ,4  ,4  ,8  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][2] =  [1  ,1  ,1  ,1  ,7  ,0  ,0  ,{ID:"wp", wpIdx:0, order:1}  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][3] =  [1  ,1  ,1  ,1  ,7  ,0  ,61 ,0  ,61 ,0  ,5  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][4] =  [1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][5] =  [1  ,1  ,1  ,1  ,7  ,0  ,61 ,{ID:"enmy", wpIdx:0, currWP:0}  ,61  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ];
	rooms[7][6] =  [1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,5  ,9  ,4  ,4  ,8  ,1  ];
	rooms[7][7] =  [1  ,1  ,1  ,1  ,7  ,0  ,61 ,0  ,61 ,0  ,12 ,13 ,0  ,55 ,5  ,1  ];
	rooms[7][8] =  [1  ,1  ,1  ,1  ,7  ,0  ,0  ,{ID:"wp", wpIdx:0, order:2}  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ];
	rooms[7][9] =  [1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,14 ,15 ,0  ,0  ,5  ,1  ];
	rooms[7][10] = [1 ,1  ,1  ,1  ,10  ,6  ,6  ,{ID:"dr", dest:12, dir:0, px:480, py:130, d:15},6  ,6  ,11  ,10  ,6  ,6  ,11  ,1 ];
	rooms[8] = [];
	rooms[8][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:3, dir:1, px:480, py:654},4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[8][1] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][3] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:9, dir:2, px:66, py:400}];
	rooms[8][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][7] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][8] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][9] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[8][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,{ID:"dr", dest:13, dir:0, px:480, py:130},6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[9] = [];
	rooms[9][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[9][1] =  [7  ,{ID:"wp", wpIdx:0, order:2},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:3},5  ];
	rooms[9][2] =  [7  ,0  ,14 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,15 ,0  ,5  ];
	rooms[9][3] =  [7  ,0  ,5  ,9  ,4  ,48 ,49 ,24 ,24 ,24 ,56 ,4  ,8  ,7  ,0  ,5  ];
	rooms[9][4] =  [7  ,0  ,12 ,13 ,{ID:"st", n:5, t:60,s1:11,s2:0,s3:2},50 ,51 ,25 ,25 ,25 ,57 ,55 ,12 ,13 ,0  ,5  ];
	rooms[9][5] =  [{ID:"dr", dest:8, dir:3, px:926, py:400},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[9][6] =  [7  ,0  ,14 ,15 ,54 ,54 ,0  ,63 ,0  ,0  ,0  ,63 ,14 ,15 ,0  ,5  ];
	rooms[9][7] =  [7  ,0  ,5  ,10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ,7  ,0  ,5  ];
	rooms[9][8] =  [7  ,0  ,12 ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,13 ,0  ,5  ];
	rooms[9][9] =  [7  ,{ID:"wp", wpIdx:0, order:1},0  ,0  ,0  ,0  ,{ID:"enmy", wpIdx:0, currWP:0},0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:4},5  ];
	rooms[9][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,{ID:"dr", dest:14, dir:0, px:480, py:130},6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[10] = [];
	rooms[10][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][2] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][3] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][4] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][5] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][6] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][7] =  [9  ,4  ,4  ,4  ,4  ,8  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][8] =  [7  ,0  ,{ID:"st", n:6, t:60,s1:3,s2:12,s3:0},{ID:"st", n:7, t:60,s1:2,s2:14,s3:13},0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][9] =  [7  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[10][10] = [10 ,{ID:"dr", dest:5, dir:0, px:96, py:130, d:15},6  ,6  ,6  ,11 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11] = [];
	rooms[11][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:6, dir:1, px:480, py:654},4  ,8  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][1] =  [7  ,0  ,61 ,0  ,61 ,0  ,61 ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][3] =  [7  ,62 ,62 ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][4] =  [7  ,62 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][5] =  [{ID:"dr", dest:0, dir:3, px:926, py:400},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][7] =  [7  ,0  ,62 ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][8] =  [7  ,0  ,0  ,62 ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][9] =  [7  ,0  ,61 ,0  ,61 ,0  ,61 ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[11][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,{ID:"dr", dest:16, dir:0, px:480, py:130},6  ,11 ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[12] = [];
	rooms[12][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:7, dir:1, px:480, py:654, d:12},4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[12][1] =  [7  ,62  ,0  ,0  ,0  ,0  ,0 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[12][2] =  [7  ,0  ,0  ,14 ,6  ,15 ,0  ,{ID:"wp", wpIdx:0, order:1}  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:2}  ,5  ];
	rooms[12][3] =  [7  ,62 ,63 ,5  ,1  ,7  ,0  ,0  ,14 ,6  ,6  ,6  ,15 ,0  ,0  ,5  ];
	rooms[12][4] =  [10 ,6  ,6  ,11 ,1  ,7  ,0  ,0  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[12][5] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,{ID:"enmy", wpIdx:0, currWP:0}  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,{ID:"dr", dest:13, dir:2, px:66, py:400}];
	rooms[12][6] =  [9  ,4  ,4  ,8  ,1  ,7  ,0  ,0  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[12][7] =  [26 ,27 ,{ID:"st", n:8, t:60,s1:15,s2:16,s3:3},5  ,1  ,7  ,0  ,0  ,12 ,4  ,4  ,4  ,13 ,0  ,0  ,5  ];
	rooms[12][8] =  [26 ,27 ,0  ,12 ,4  ,13 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[12][9] =  [26 ,27 ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:4}  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:3}  ,5  ];
	rooms[12][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[13] = [];
	rooms[13][0] =  [1  ,1  ,1  ,1  ,1  ,9  ,4  ,{ID:"dr", dest:8, dir:1, px:480, py:654},4  ,8  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][1] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][2] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][3] =  [9  ,4  ,4  ,4  ,4  ,13 ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][5] =  [{ID:"dr", dest:12, dir:3, px:926, py:400},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][7] =  [10 ,6  ,6  ,6  ,6  ,15 ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][8] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][9] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[13][10] = [1  ,1  ,1  ,1  ,1  ,10 ,6  ,{ID:"dr", dest:18, dir:0, px:480, py:130},6  ,11 ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[14] = [];
	rooms[14][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:9, dir:1, px:480, py:654},4  ,4  ,4  ,4  ,4 , 4  ,4  ,8  ];
	rooms[14][1] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][3] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][7] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][8] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][9] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[14][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[15] = [];
	rooms[15][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[15][1] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][3] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:16, dir:2, px:66, py:400}];
	rooms[15][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][7] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][8] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][9] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[15][10] = [10 ,6  ,6  ,6  ,6 , 6  ,6  ,{ID:"dr", dest:20, dir:0, px:480, py:130},6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[16] = [];
	rooms[16][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,9  ,{ID:"dr", dest:11, dir:1, px:480, py:654},8  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[16][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,7  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[16][2] =  [9  ,4  ,96 ,97 ,96 ,97 ,13 ,0  ,12 ,96 ,97 ,96 ,97 ,96 ,97 ,8  ];
	rooms[16][3] =  [7  ,68 ,98 ,99 ,98 ,99 ,0  ,0  ,0  ,98 ,99 ,98 ,99 ,98 ,99 ,5  ];
	rooms[16][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:17, dir:2, px:66, py:336, d:4, col:3}];
	rooms[16][5] =  [{ID:"dr", dest:15, dir:3, px:926, py:400},0  ,0  ,0  ,14 ,15 ,0  ,0 , 0  ,14 ,15 ,0  ,0  ,0  ,14 ,11  ];
	rooms[16][6] =  [100,101,0  ,104,105,100,101,0  ,104,105,100,101,0  ,104,105,1  ];
	rooms[16][7] =  [102,103,0  ,106,107,102,103,0  ,106,107,102,103,0  ,106,107,1  ];
	rooms[16][8] =  [100,101,0  ,104,105,100,101,0  ,104,105,100,101,0  ,104,105,1  ];
	rooms[16][9] =  [102,103,0  ,106,107,102,103,0  ,106,107,102,103,0  ,106,107,1  ];
	rooms[16][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ,1  ];
	rooms[17] = [];
	rooms[17][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[17][1] =  [7  ,62 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[17][2] =  [7  ,0  ,0  ,14 ,6  ,15 ,0  ,{ID:"wp", wpIdx:0, order:1}  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:2}  ,5  ];
	rooms[17][3] =  [7  ,0  ,0  ,5  ,1  ,7  ,0  ,0  ,14 ,6  ,6  ,6  ,15 ,0  ,0  ,5  ];
	rooms[17][4] =  [{ID:"dr", dest:16, dir:3, px:926, py:336},0  ,0  ,5  ,1  ,7  ,0  ,0  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[17][5] =  [10 ,6  ,6  ,11 ,1  ,7  ,0  ,{ID:"enmy", wpIdx:0, currWP:0}  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[17][6] =  [9  ,4  ,4  ,8  ,1  ,7  ,0  ,0  ,5  ,1  ,1  ,1  ,7  ,0  ,0  ,5  ];
	rooms[17][7] =  [26 ,27 ,{ID:"st", n:8, t:60,s1:15,s2:16,s3:3},5  ,1  ,7  ,0  ,0  ,12 ,4  ,4  ,4  ,13 ,0  ,0  ,5  ];
	rooms[17][8] =  [26 ,27 ,0  ,12 ,4  ,13 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[17][9] =  [26 ,27 ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:4}  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:3}  ,5  ];
	rooms[17][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,{ID:"dr", dest:22, dir:0, px:736, py:130},6  ,6  ,6  ,11 ];
	rooms[18] = [];
	rooms[18][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:13, dir:1, px:480, py:654, d:5, col:4},4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[18][1] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][3] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][5] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:19, dir:2, px:66, py:400}];
	rooms[18][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][7] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][8] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][9] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[18][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,{ID:"dr", dest:23, dir:0, px:928, py:130},11 ];
	rooms[19] = [];
	rooms[19][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][1] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][2] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][3] =  [9  ,4  ,56 ,56 ,8  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][4] =  [7  ,0  ,57 ,57 ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][5] =  [{ID:"dr", dest:18, dir:3, px:926, py:400},0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][6] =  [7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][7] =  [7  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[19][8] =  [7  ,0  ,0  ,69 ,12 ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ,1  ,1  ,1  ];
	rooms[19][9] =  [18 ,{ID:"st", t:19, s1:0, s2:3, s3:0},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,1  ];
	rooms[19][10] = [10 ,6  ,6  ,6  ,6  ,{ID:"dr", dest:24, dir:0, px:352, py:130, d:15},6  ,6  ,6  ,6  ,{ID:"dr", dest:24, dir:0, px:672, py:130, d:17},6  ,11 ,1  ,1  ,1  ];
	rooms[20] = [];
	rooms[20][0] =  [9  ,4  ,24 ,24 ,24 ,24 ,4  ,{ID:"dr", dest:15, dir:1, px:480, py:654},4  ,8  ,9  ,4  ,48 ,49 ,4  ,8  ];
	rooms[20][1] =  [26 ,27 ,25 ,25 ,25 ,25 ,0  ,0  ,0  ,5  ,7  ,0  ,50 ,51 ,29 ,28 ];
	rooms[20][2] =  [26 ,27 ,0  ,58 ,58 ,58 ,58 ,58 ,58 ,12 ,13 ,58 ,58 ,0  ,29 ,28 ];
	rooms[20][3] =  [26 ,27 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,63 ,0  ,0  ,0  ,0  ,29 ,28 ];
	rooms[20][4] =  [26 ,27 ,0  ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,0  ,29 ,28 ];
	rooms[20][5] =  [26 ,27 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,29 ,28 ];
	rooms[20][6] =  [26 ,27 ,0  ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,58 ,0  ,0  ,29 ,28 ];
	rooms[20][7] =  [26 ,27 ,0  ,0  ,54 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,61 ,0  ,5  ];
	rooms[20][8] =  [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[20][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[20][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[21] = [];
	rooms[21][0] =  [1  ,1  ,1  ,1  ,1  ,9  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[21][1] =  [1  ,1  ,1  ,1  ,1  ,7  ,{ID:"wp", wpIdx:0, order:4},0  ,0  ,0  ,{ID:"enmy", wpIdx:0, currWP:0, reversePath:true}  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:1},5  ];
	rooms[21][2] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,59 ,59 ,59 ,0  ,59 ,59 ,59 ,0  ,5  ];
	rooms[21][3] =  [1  ,1  ,1  ,1  ,1  ,7  ,{ID:"wp", wpIdx:0, order:3},0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:0, order:2},5  ];
	rooms[21][4] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,59 ,59 ,59 ,0  ,59 ,59 ,59 ,0  ,5  ];
	rooms[21][5] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[21][6] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,59 ,59 ,59 ,0  ,59 ,59 ,59 ,0  ,5  ];
	rooms[21][7] =  [1  ,1  ,1  ,1  ,1  ,7  ,{ID:"wp", wpIdx:1, order:2},0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"wp", wpIdx:1, order:3},5  ];
	rooms[21][8] =  [1  ,1  ,1  ,1  ,1  ,7  ,0  ,59 ,59 ,59 ,0  ,59 ,59 ,59 ,0 ,5  ];
	rooms[21][9] =  [1  ,1  ,1  ,1  ,1  ,7  ,{ID:"wp", wpIdx:1, order:1},0  ,0  ,0  ,0  ,{ID:"enmy", wpIdx:1, currWP:0}  ,0  ,0  ,{ID:"wp", wpIdx:1, order:4} ,{ID:"dr", dest:22, dir:2, px:66, py:656}];
	rooms[21][10] = [1  ,1  ,1  ,1  ,1  ,10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[22] = [];
	rooms[22][0] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,4  ,{ID:"dr", dest:17, dir:1, px:736, py:654},4  ,56  ,4  ,8  ];
	rooms[22][1] =  [7  ,0  ,55 ,55 ,0  ,55 ,55 ,0  ,55 ,55 ,0  ,0  ,0  ,57 ,0  ,5  ];
	rooms[22][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[22][3] =  [7  ,0  ,53 ,52 ,0  ,0  ,0  ,63 ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[22][4] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,53 ,52 ,0  ,5  ];
	rooms[22][5] =  [7  ,0  ,53 ,52 ,0  ,0  ,14 ,15 ,0  ,14 ,15 ,0  ,0  ,0  ,0  ,5  ];
	rooms[22][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,5  ,7  ,0  ,0  ,0  ,0  ,5  ];
	rooms[22][7] =  [10 ,6  ,6  ,6  ,6  ,6  ,11 ,7  ,0  ,5  ,10 ,6  ,6  ,6  ,6  ,11 ];
	rooms[22][8] =  [9  ,4  ,4  ,4  ,4  ,4  ,4  ,13 ,0  ,12 ,4  ,4  ,4  ,4  ,4  ,8  ];
	rooms[22][9] =  [{ID:"dr", dest:21, dir:3, px:926, py:656},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,{ID:"dr", dest:23, dir:2, px:66, py:660}];
	rooms[22][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[23] = [];
	rooms[23][0] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,9  ,{ID:"dr", dest:18, dir:1, px:928, py:654},8  ];
	rooms[23][1] =  [1  ,9  ,48 ,49 ,4  ,48 ,49 ,4  ,4	,56 ,56 ,4  ,8  ,7  ,0  ,5  ];
	rooms[23][2] =  [1  ,7  ,50 ,51 ,0  ,50 ,51 ,0  ,0	,57 ,57 ,0  ,5  ,7  ,0  ,5  ];
	rooms[23][3] =  [1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,5  ];
	rooms[23][4] =  [1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,5  ];
	rooms[23][5] =  [1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,5  ];
	rooms[23][6] =  [1  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,5  ];
	rooms[23][7] =  [1  ,10 ,6  ,15 ,0  ,14 ,6  ,6  ,6  ,15 ,0  ,14 ,11 ,7  ,0  ,5  ];
	rooms[23][8] =  [9  ,4  ,4  ,13 ,0  ,12 ,4  ,4  ,4  ,13 ,0  ,12 ,4  ,13 ,0  ,5  ];
	rooms[23][9] =  [{ID:"dr", dest:22, dir:3, px:926, py:660},0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[23][10] = [10 ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[24] = [];
	rooms[24][0] =  [9  ,76 ,77 ,8  ,9  ,{ID:"dr", dest:19, dir:1, px:352, py:654, d:12},8  ,1  ,1  ,9  ,{ID:"dr", dest:19, dir:1, px:672, py:654, d:16},8  ,9  ,76 ,77 ,8  ];
	rooms[24][1] =  [7  ,78 ,79 ,12 ,13 ,0  ,5  ,1  ,1  ,7  ,0  ,12 ,13 ,78 ,79 ,5  ];
	rooms[24][2] =  [7  ,0  ,0  ,0  ,0  ,0  ,5  ,1  ,1  ,7  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[24][3] =  [7  ,0  ,14 ,6  ,6  ,6  ,11 ,1  ,1  ,10 ,6  ,6  ,6  ,15 ,0  ,5  ];
	rooms[24][4] =  [7  ,0  ,12 ,72 ,72 ,74 ,72 ,8  ,9  ,70 ,72 ,72 ,74 ,13 ,0  ,5  ];
	rooms[24][5] =  [7  ,0  ,0  ,73 ,73 ,75 ,73 ,5  ,7  ,71 ,73 ,73 ,75 ,0  ,0  ,5  ];
	rooms[24][6] =  [7  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ,7  ,0  ,0  ,0  ,0  ,0  ,0  ,5  ];
	rooms[24][7] =  [10 ,6  ,6  ,6  ,6  ,6  ,6  ,11 ,10 ,6  ,6  ,6  ,6  ,6  ,6  ,11 ];
	rooms[24][8] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[24][9] =  [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
	rooms[24][10] = [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ];
}

function level2() 
{
	// 6 7 8
	// 3 4 5
	// 2 1 0
	
	rooms = [];
	rooms[0] = []; 
	rooms[0][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[0][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][5] =  [{dest:1, dir:3, px:926, py:400},0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[0][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[1] = [];
	rooms[1][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[1][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][5] =  [{dest:2, dir:3, px:926, py:400},0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,{dest:0, dir:2, px:66, py:400}];
	rooms[1][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[1][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[2] = [];
	rooms[2][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,{dest:3, dir:1, px:480, py:654},4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[2][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][5] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,{dest:1, dir:2, px:66, py:400}];
	rooms[2][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[2][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[3] = [];
	rooms[3][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,{dest:6, dir:1, px:480, py:654},4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[3][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][5] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[3][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,{dest:2, dir:0, px:480, py:130},6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[4] = [];
	rooms[4][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,{dest:7, dir:1, px:480, py:654},4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[4][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][5] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,{dest:5, dir:2, px:66, py:400}];
	rooms[4][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[4][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[5] = [];
	rooms[5][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[5][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][5] =  [{dest:4, dir:3, px:926, py:400},0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[5][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[6] = [];
	rooms[6][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[6][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][5] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,{dest:7, dir:2, px:66, py:400}];
	rooms[6][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[6][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,{dest:3, dir:0, px:480, py:130},6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[7] = [];
	rooms[7][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[7][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][5] =  [{dest:6, dir:3, px:926, py:400},0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,{dest:8, dir:2, px:66, py:400}];
	rooms[7][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[7][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,{dest:4, dir:0, px:480, py:130},6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
	rooms[8] = [];
	rooms[8][0] =  [9 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,8 ];
	rooms[8][1] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][2] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][3] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][4] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][5] =  [{dest:7, dir:3, px:926, py:400},0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][6] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][7] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][8] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][9] =  [7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ];
	rooms[8][10] = [10,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,11];
}