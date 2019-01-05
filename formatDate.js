/**
 * 日時を整形して返す
 * @param {Date|string} date
 * @param {Object} op
 * @returns {string}
 */
var formatDate = (function(date, op){
	
	/**
	 * 日時表示フォーマット
	 * @type {string}
	 */
	var date_format = 'YYYY年MM月DD日(WD)';

	/**
	 * 曜日表示用文字列
	 * @type {string[]}
	 */
	var day_name = ["日", "月", "火", "水", "木", "金", "土"];

	/**
	 * 日時表示フォーマットか否か
	 * @param tgt
	 * @returns {boolean}
	 */
	function isDateFormat(tgt){
		return tgt && (typeof tgt === "string" || tgt instanceof String);
	}

	/**
	 * 曜日表示用文字列か否か
	 * @param tgt
	 * @returns {boolean}
	 */
	function isDayName(tgt){
		return tgt && Array.isArray(tgt) && tgt.length === 7;
	}

	return function(date, op){
		if(!op){
			op = {};
		}

		var _date_format = isDateFormat(op.date_format) ? op.date_format : date_format;
		var _day_name = isDayName(op.day_name) ? op.day_name : day_name;

		// op だけ渡されたらデフォルト設定を更新して終わり
		if(!date){
			date_format = _date_format;
			day_name = _day_name;
			return;
		}

		if(typeof date === "string" || date instanceof String){
			date = new Date(date.replace(/-/g, '/'));
		}

		_date_format = _date_format.replace(/YYYY/g, date.getFullYear());
		_date_format = _date_format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
		_date_format = _date_format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
		_date_format = _date_format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
		_date_format = _date_format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
		_date_format = _date_format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
		_date_format = _date_format.replace(/MS/g, ('00' + date.getMilliseconds()).slice(-3));
		_date_format = _date_format.replace(/WD/g, _day_name[date.getDay()]);
		return _date_format;
	};
})();