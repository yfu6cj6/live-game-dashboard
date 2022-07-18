export function getRoadArray(type, roadData, recordCurIndex)
{
  switch (type)
  {
    case 0:       return convertToBigRoad(roadData, recordCurIndex);
    case 1:      return convertToBeadRoad(roadData, recordCurIndex);
    case 2:    return convertToBigEyeRoad(roadData, recordCurIndex);
    case 3:     return convertToSmallRoad(roadData, recordCurIndex);
    case 4: return convertToCockroachRoad(roadData, recordCurIndex);
  }
  return null;
}
export function isGoodRoad(roadData)
{
    return detectGoodRoad(roadData);
}

/** 0=BigRoad  1=BeadRoad  2=BigEyeRoad  3=SmallRoad  4=CockroachRoad*/
export function askRoad(roadData, isAskBanker)
{
    return askRoadResult(roadData, isAskBanker);
}

export function getStatistic(roadData)
{
    return statistic(roadData);
}

/** 0莊 1閒 2和 3莊對 4閒對 5總數 */
function statistic(scores)
{
    var sc = scores.split(',');
    var current = "";
    var result = [];
    for (var i = 0; i < 6; i++) {
        result[i] = 0;
    }
    for (var j = 0; j < sc.length; j++) {
        current = sc[j];
        result[5]++;
        switch (current) {
            case "1":
                result[0]++;
                break;
            case "2":
                result[1]++;
                break;
            case "3":
                result[2]++;
                break;
            case "5":
                result[3]++;
                result[0]++;
                break;
            case "6":
                result[3]++;
                result[1]++;
                break;
            case "7":
                result[3]++;
                result[2]++;
                break;
            case "9":
                result[4]++;
                result[0]++;
                break;
            case "10":
                result[4]++;
                result[1]++;
                break;
            case "11":
                result[4]++;
                result[2]++;
                break;
            case "13":
                result[3]++;
                result[4]++;
                result[0]++;
                break;
            case "14":
                result[3]++;
                result[4]++;
                result[1]++;
                break;
            case "15":
                result[3]++;
                result[4]++;
                result[2]++;
                break;
            default:
                break;
        }
    }
    return result;
}


/** 
 * (1)_(2)
 * 
 *   bigRoad: {
        banker: 1,
        player: 2,
        tie: 3   //空
    }, 
    bigRoadPair: {
        NoPair: 0,
        bankerPair: 1,
        playerPair: 2,
        allPair:3
    },
    * 
    */
function convertToBeadRoad(scores, recordCurIndex) {
    var board = initBoard(6, 30);
    var sc = scores.split(',');
    var bp = false;
    var pp = false;
    var columnIndex = 0;
    var rowIndex = 0;
    var current = "";
    for (var i = 0; i < sc.length; i++) {
        bp = false;
        pp = false;
        current = sc[i];
        switch (current) {
            case "5":
                bp = true;
                current = "1";
                break;
            case "6":
                bp = true;
                current = "2";
                break;
            case "7":
                bp = true;
                current = "3";
                break;
            case "9":
                pp = true;
                current = "1";
                break;
            case "10":
                pp = true;
                current = "2";
                break;
            case "11":
                pp = true;
                current = "3";
                break;
            case "13":
                bp = true;
                pp = true;
                current = "1";
                break;
            case "14":
                bp = true;
                pp = true;
                current = "2";
                break;
            case "15":
                bp = true;
                pp = true;
                current = "3";
                break;
            default:
                break;
        }

        var pairStatus = "0";
        if (bp) {
            pairStatus = "1";
        }
        if (pp) {
            pairStatus = "2";
        }
        if (bp && pp) {
            pairStatus = "3";
        }
        board[rowIndex][columnIndex] = current + "_" + pairStatus;
        if (recordCurIndex != undefined && i == recordCurIndex) {
            board[rowIndex][columnIndex] += "_1";
        }
        rowIndex++;
        if (rowIndex === 6) {
            rowIndex = 0;
            columnIndex++;
        }
    }
    return board;
}

function initBoard(rowCount, colCount)
{
    var result = [];
    for (var i = 0; i < rowCount; i++) {
        result[i] = [];
        for (var j = 0; j < colCount; j++) {
            result[i][j] = "";
        }
    }
    return result;
}


    /** 
     * (1)_(2)_(3)
     * 
     *   bigRoad: {
            banker: 1,
            player: 2,
            tie: 3
        }, 
        bigRoadPair: {
            NoPair: 0,
            bankerPair: 1,
            playerPair: 2,
            allPair:3
        },
        bigRoadTieCount: {
            no: 0,  //沒有線
            one: 1, //有和局
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        },
    * 
    */
    function convertToBigRoad(scores, recordCurIndex) {
        var sc = scores.split(',');
        var result = initBoard(6, 99);
        var columnIndex = 0;
        var rowIndex = 0;
        var last = "";
        var bp = false;
        var pp = false;
        var current = "";
        var tieCount = 0;
        for (var i = 0; i < sc.length; i++) {
            bp = false;
            pp = false;
            current = sc[i];
            switch (current) {
                case "5":
                    bp = true;
                    current = "1";
                    break;
                case "6":
                    bp = true;
                    current = "2";
                    break;
                case "7":
                    bp = true;
                    current = "3";
                    break;
                case "9":
                    pp = true;
                    current = "1";
                    break;
                case "10":
                    pp = true;
                    current = "2";
                    break;
                case "11":
                    pp = true;
                    current = "3";
                    break;
                case "13":
                    bp = true;
                    pp = true;
                    current = "1";
                    break;
                case "14":
                    bp = true;
                    pp = true;
                    current = "2";
                    break;
                case "15":
                    bp = true;
                    pp = true;
                    current = "3";
                    break;
                default:
                    break;
            }

            if (current === last) {
                if (current !== "3") {
                    if (rowIndex < 5) {
                        var rowData1 = result[rowIndex + 1];
                        if (rowData1[columnIndex] === "") {
                            rowIndex++;
                        } else {
                            columnIndex++;
                        }
                    } else {
                        columnIndex++;
                    }
                }
            }

            if (current !== last && last !== "") {
                if (current !== "3") {
                    var lastResult = result[rowIndex][columnIndex].split('_');
                    if (lastResult[0] === current) {
                        if (rowIndex < 5) {
                            rowIndex++;
                        } else {
                            columnIndex++;
                        }
                    }
                    else {
                        for (var index = 0; index < result[0].length; index++) {
                            if (result[0][index] === "") {
                                columnIndex = index;
                                break;
                            }
                        }
                        rowIndex = 0;
                    }
                    tieCount = 0;
                }
            }

            var pairStatus = "0";
            switch (current) {
                case "1":
                    if (bp) {
                        pairStatus = "1";
                    }
                    if (pp) {
                        pairStatus = "2";
                    }
                    if (bp && pp) {
                        pairStatus = "3";
                    }
                    var rowResult1 = result[rowIndex];
                    rowResult1[columnIndex] = "1_" + pairStatus + "_" + tieCount;

                    break;
                case "2":
                    if (bp) {
                        pairStatus = "1";
                    }
                    if (pp) {
                        pairStatus = "2";
                    }
                    if (bp && pp) {
                        pairStatus = "3";
                    }
                    var rowResult2 = result[rowIndex];
                    rowResult2[columnIndex] = "2_" + pairStatus + "_" + tieCount;

                    break;
                case "3":
                    if (last === "") {
                        result[rowIndex][columnIndex] = "3_0_0";
                        break;
                    }
                    var temp = result[rowIndex][columnIndex].split('_');
                    tieCount++;
                    var rowResult3 = result[rowIndex];
                    rowResult3[columnIndex] = temp[0] + "_" + temp[1] + "_" + tieCount;
                    break;
                default:
                    break;
            }
            if (recordCurIndex != undefined && i == recordCurIndex) {
                result[rowIndex][columnIndex] += "_1";
            }
            last = current;
        }

        return result;
    }
    function convertToNoTurnBigRoad(scores, recordCurIndex)
    {
        var sc = scores.split(',');

        var curIndex = -1;
        var maxSameCount = 0;
        var sameCount = 1;
        for (var i = 0; i < sc.length; i++)
        {
            let num = Number((sc[i]) ? sc[i] : -1);
            if (num >= 0)
            {
                if (curIndex == num)
                {
                    sameCount++;
                }
                else
                {
                    sameCount = 1;
                }

                if (sameCount > maxSameCount)
                    maxSameCount = sameCount;
                curIndex = num;
            }
        }
        // console.log("maxSameCount = " + maxSameCount);
        if (maxSameCount < 15)
            maxSameCount = 15;

        var result = initBoard(maxSameCount, 99);
        var columnIndex = 0;
        var rowIndex = 0;
        var last = "";
        var bp = false;
        var pp = false;
        var current = "";
        var tieCount = 0;
        for (var i = 0; i < sc.length; i++) {
            bp = false;
            pp = false;
            current = sc[i];
            switch (current) {
                case "5":
                    bp = true;
                    current = "1";
                    break;
                case "6":
                    bp = true;
                    current = "2";
                    break;
                case "7":
                    bp = true;
                    current = "3";
                    break;
                case "9":
                    pp = true;
                    current = "1";
                    break;
                case "10":
                    pp = true;
                    current = "2";
                    break;
                case "11":
                    pp = true;
                    current = "3";
                    break;
                case "13":
                    bp = true;
                    pp = true;
                    current = "1";
                    break;
                case "14":
                    bp = true;
                    pp = true;
                    current = "2";
                    break;
                case "15":
                    bp = true;
                    pp = true;
                    current = "3";
                    break;
                default:
                    break;
            }

            if (current === last) {
                if (current !== "3") {
                    rowIndex++;
                }
            }

            if (current !== last && last !== "") {
                if (current !== "3") {
                    var lastResult = result[rowIndex][columnIndex].split('_');
                    if (lastResult[0] === current) {
                        rowIndex++;
                    }
                    else {
                        columnIndex++;
                        rowIndex = 0;
                    }
                    tieCount = 0;
                }
            }

            var pairStatus = "0";
            switch (current) {
                case "1":
                    if (bp) {
                        pairStatus = "1";
                    }
                    if (pp) {
                        pairStatus = "2";
                    }
                    if (bp && pp) {
                        pairStatus = "3";
                    }
                    var rowResult1 = result[rowIndex];
                    rowResult1[columnIndex] = "1_" + pairStatus + "_" + tieCount;

                    break;
                case "2":
                    if (bp) {
                        pairStatus = "1";
                    }
                    if (pp) {
                        pairStatus = "2";
                    }
                    if (bp && pp) {
                        pairStatus = "3";
                    }
                    var rowResult2 = result[rowIndex];
                    rowResult2[columnIndex] = "2_" + pairStatus + "_" + tieCount;

                    break;
                case "3":
                    if (last === "") {
                        result[rowIndex][columnIndex] = "3_0_0";
                        break;
                    }
                    var temp = result[rowIndex][columnIndex].split('_');
                    tieCount++;
                    var rowResult3 = result[rowIndex];
                    rowResult3[columnIndex] = temp[0] + "_" + temp[1] + "_" + tieCount;
                    break;
                default:
                    break;
            }
            if (recordCurIndex != undefined && i == recordCurIndex) {
                result[rowIndex][columnIndex] += "_1";
            }
            last = current;
        }

        var clone = JSON.parse(JSON.stringify(result));
        return result;
    }
 function GetTable(bigRoadMap, firstCheckColumnIndex) {
        var board = initBoard(6, 99);

        var bigRoadMapRowIndex = 1;
        var bigRoadMapColumnIndex = firstCheckColumnIndex;
        var rowIndex = 0;
        var columnIndex = 0;
        // console.log(bigRoadMap)

        while (true) {

            var isCur = false;
            
            if (bigRoadMapColumnIndex >= bigRoadMap[bigRoadMapRowIndex].length)
            {
                console.error("欄位數大於最大欄位長度(99)");
                break;
            }
            else
            {
                if (bigRoadMap[bigRoadMapRowIndex][bigRoadMapColumnIndex] === "") {
                    bigRoadMapRowIndex = 0;
                    bigRoadMapColumnIndex++;
                    if (bigRoadMap[bigRoadMapRowIndex][bigRoadMapColumnIndex] === "") {
                        break;
                    }
                    continue;
                }

                if (bigRoadMap[bigRoadMapRowIndex][bigRoadMapColumnIndex].split("_")[3] === '1') {
                    isCur = true;
                }
            }

            var isRed = false;
            if (bigRoadMapRowIndex === 0) {
                var leftColumnCount = bigRoadMap.filter(function (value, index) { return value[bigRoadMapColumnIndex - 1] !== ""; }).length;
                var leftMoreColumnCount = bigRoadMap.filter(function (value, index) { return value[bigRoadMapColumnIndex - firstCheckColumnIndex - 1] !== ""; }).length;
                if (leftColumnCount === leftMoreColumnCount) {
                    isRed = true;
                }

            } else {
                var isLeftCellEmpty = bigRoadMap[bigRoadMapRowIndex][bigRoadMapColumnIndex - firstCheckColumnIndex] === "";
                var isTopLeftCellEmpty = bigRoadMap[bigRoadMapRowIndex - 1][bigRoadMapColumnIndex - firstCheckColumnIndex] === "";
                if (isLeftCellEmpty === isTopLeftCellEmpty) {
                    isRed = true;
                }
            }

            if (board[rowIndex][columnIndex] !== "") {
                var isOriginalRed = board[rowIndex][columnIndex].split("_")[0] === "1";
                if (isRed === isOriginalRed) {
                    if (rowIndex < 5) {
                        rowIndex++;
                    } else {
                        columnIndex++;
                    }
                } else {
                    for (var index = 0; index < board[0].length; index++) {
                        if (board[0][index] === "") {
                            columnIndex = index;
                            break;
                        }
                    }
                    rowIndex = 0;
                }
            }

            board[rowIndex][columnIndex] = isRed ? "1" : "2";
            if (isCur) {
                board[rowIndex][columnIndex] += "_1"
            }

            bigRoadMapRowIndex++;
        }

        // console.log(board);
        return board;
    }

    //1是紅  2是藍
    /** 大眼路(空心圈) */
    function convertToBigEyeRoad(scores, recordCurIndex) {
        var bigRoadMap = convertToNoTurnBigRoad(scores, recordCurIndex);
        return convertToBigEyeRoadFromBigRoad(bigRoadMap);
    }
    function convertToBigEyeRoadFromBigRoad(bigRoadMap) { return GetTable(bigRoadMap, 1); }

    /** 小路(實心圈) */
    function convertToSmallRoad(scores, recordCurIndex) {
        var bigRoadMap = convertToNoTurnBigRoad(scores, recordCurIndex);
        return convertToSmallRoadFromBigRoad(bigRoadMap);
    }
    function convertToSmallRoadFromBigRoad(bigRoadMap) { return GetTable(bigRoadMap, 2); }

    /** 蟑螂路(斜線) */
    function convertToCockroachRoad(scores, recordCurIndex) {
        var bigRoadMap = convertToNoTurnBigRoad(scores, recordCurIndex);
        return convertToCockroachRoadFromBigRoad(bigRoadMap);
    }
    function convertToCockroachRoadFromBigRoad(bigRoadMap) { return GetTable(bigRoadMap, 3); }

/** 好路判斷 */
 function detectGoodRoad(scores) {

        var replaceArray = ['5', '6', '7', '9', '10', '11', '13', '14', '15'];
        for (var i = 0; i < replaceArray.length; i++) {
            var replaceItem = replaceArray[i];
            switch (replaceItem) {
                case '5':
                case '9':
                case '13':
                    scores = scores.replace(new RegExp(replaceItem, "g"), '1');
                    break;
                case '6':
                case '10':
                case '14':
                    scores = scores.replace(new RegExp(replaceItem, "g"), '2');
                    break;
                case '7':
                case '11':
                case '15':
                    scores = scores.replace(new RegExp(replaceItem, "g"), '3');
                    break;
                default:
                    break;
            }
        }
        scores = scores.replace(new RegExp("3", "g"), '');
        scores = scores.replace(new RegExp(",", "g"), '');

        var isGoodRoad = false;

        //長莊
        if (new RegExp("1111$").test(scores))
            isGoodRoad = true;

        //長閒
        if (new RegExp("2222$").test(scores))
            isGoodRoad = true;

        //一房兩聽(莊)
        if (new RegExp("122122$").test(scores))
            isGoodRoad = true;

        //一房兩聽(閒)
        if (new RegExp("211211$").test(scores))
            isGoodRoad = true;

        //逢莊黐
        if (new RegExp("11112112$").test(scores))
            isGoodRoad = true;

        //逢閒黐
        if (new RegExp("221222211$").test(scores))
            isGoodRoad = true;

        //逢莊黐
        if (new RegExp("12+1{2,}2+12+1{2,}$").test(scores))
            isGoodRoad = true;

        //逢閒黐
        if (new RegExp("21+2{2,}1+21+2{2,}$").test(scores))
            isGoodRoad = true;

        //大路單跳
        if (new RegExp("1212$").test(scores) || new RegExp("2121$").test(scores))
            isGoodRoad = true;

        //拍拍黐
        if (new RegExp("1{2,}2221{2,}$").test(scores) || new RegExp("2{2,}1112{2,}$").test(scores))
            isGoodRoad = true;

        return isGoodRoad;
    }

    function askRoadResult(scores, isAskBanker)
    {
        // 0=大路  1=珠盤路  2=大眼路  3=小路  4=蟑螂路
        var resultArray = [];
        var newScore = scores.concat(isAskBanker ? ",1" : ",2");

        var bigRoad = convertToBigRoad(scores);
        var estimateBigRoad = convertToBigRoad(scores.concat(isAskBanker ? ",1" : ",2"));
        resultArray.push(compareTwoTable(bigRoad, estimateBigRoad));

        var beadRoad = convertToBeadRoad(scores);
        var estimateBeadRoad = convertToBeadRoad(scores.concat(isAskBanker ? ",1" : ",2"));
        resultArray.push(compareTwoTable(beadRoad, estimateBeadRoad));

        //三小路用的BigRoad
        var ntBigRoad = convertToNoTurnBigRoad(scores);
        var ntEstimateBigRoad = convertToNoTurnBigRoad(newScore);

        var bigEyeRoad = convertToBigEyeRoadFromBigRoad(ntBigRoad);
        var estimateBigEyeRoad = convertToBigEyeRoadFromBigRoad(ntEstimateBigRoad);
        resultArray.push(compareTwoTable(bigEyeRoad, estimateBigEyeRoad));

        var smallRoad = convertToSmallRoadFromBigRoad(ntBigRoad);
        var estimateSmallRoad = convertToSmallRoadFromBigRoad(ntEstimateBigRoad);
        resultArray.push(compareTwoTable(smallRoad, estimateSmallRoad));

        var cockroachRoad = convertToCockroachRoadFromBigRoad(ntBigRoad);
        var estimateCockroachRoad = convertToCockroachRoadFromBigRoad(ntEstimateBigRoad);
        resultArray.push(compareTwoTable(cockroachRoad, estimateCockroachRoad));

        // console.log(resultArray);
        return resultArray;
    }

    function compareTwoTable(oldTable, newTable)
    {
        var result = [];
        
        for (var i = 0; i < newTable.length; i++)   //6
        {
            var colum = [];
            for (var j = 0, max = newTable[0].length; j < max; j++)    //99
            {
                if (oldTable[i][j] === newTable[i][j])
                {
                    colum.push("");
                }
                else
                {
                    colum.push(newTable[i][j]);
                }
            }
            result.push(colum);
        }
        return result;
    }
