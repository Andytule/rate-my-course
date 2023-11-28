"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Table = _interopRequireDefault(require("@mui/material/Table"));
var _TableBody = _interopRequireDefault(require("@mui/material/TableBody"));
var _TableCell = _interopRequireDefault(require("@mui/material/TableCell"));
var _TableContainer = _interopRequireDefault(require("@mui/material/TableContainer"));
var _TableHead = _interopRequireDefault(require("@mui/material/TableHead"));
var _TablePagination = _interopRequireDefault(require("@mui/material/TablePagination"));
var _TableRow = _interopRequireDefault(require("@mui/material/TableRow"));
var _TableSortLabel = _interopRequireDefault(require("@mui/material/TableSortLabel"));
var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Switch = _interopRequireDefault(require("@mui/material/Switch"));
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _FilterList = _interopRequireDefault(require("@mui/icons-material/FilterList"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _utils = require("@mui/utils");
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
var _apiConfig = _interopRequireDefault(require("apiConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Comparator function for sorting an array of objects in descending order.
 *
 * @param {Object} a - The first object for comparison.
 * @param {Object} b - The second object for comparison.
 * @param {string} orderBy - The property to sort by.
 * @returns {number} - Result of the comparison.
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Gets the comparator function based on the order and orderBy parameters.
 *
 * @param {string} order - The sorting order ('asc' or 'desc').
 * @param {string} orderBy - The property to sort by.
 * @returns {Function} - Comparator function.
 */
function getComparator(order, orderBy) {
  return order === 'desc' ? function (a, b) {
    return descendingComparator(a, b, orderBy);
  } : function (a, b) {
    return -descendingComparator(a, b, orderBy);
  };
}

/**
 * Stabilizes the sorting of an array by preserving the original order of equal elements.
 *
 * @param {Array} array - The array to stabilize.
 * @param {Function} comparator - The comparator function.
 * @returns {Array} - The stabilized array.
 */
function stableSort(array, comparator) {
  var stabilizedThis = array.map(function (el, index) {
    return [el, index];
  });
  stabilizedThis.sort(function (a, b) {
    var order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(function (el) {
    return el[0];
  });
}
var headCells = [{
  id: 'courseName',
  numeric: false,
  disablePadding: true,
  label: 'Course Name'
}, {
  id: 'courseCode',
  numeric: true,
  disablePadding: false,
  label: 'Course Code'
}, {
  id: 'term',
  numeric: true,
  disablePadding: false,
  label: 'Term'
}, {
  id: 'level',
  numeric: true,
  disablePadding: false,
  label: 'Level'
}, {
  id: 'rating',
  numeric: true,
  disablePadding: false,
  label: 'Rating'
}, {
  id: 'schoolName',
  numeric: true,
  disablePadding: false,
  label: 'School Name'
}, {
  id: 'comments',
  numeric: true,
  disablePadding: false,
  label: 'Comments'
}, {
  id: 'tipsAndTricks',
  numeric: true,
  disablePadding: false,
  label: 'Tips & Tricks'
}];

/**
 * Defines the head cells for the table, including sorting functionality.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered component.
 */
function EnhancedTableHead(props) {
  var order = props.order,
    orderBy = props.orderBy,
    onRequestSort = props.onRequestSort;
  var createSortHandler = function createSortHandler(property) {
    return function (event) {
      onRequestSort(event, property);
    };
  };
  return /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    padding: "checkbox"
  }), headCells.map(function (headCell) {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      key: headCell.id,
      align: headCell.numeric ? 'right' : 'left',
      padding: headCell.disablePadding ? 'none' : 'normal',
      sortDirection: orderBy === headCell.id ? order : false
    }, /*#__PURE__*/_react.default.createElement(_TableSortLabel.default, {
      active: orderBy === headCell.id,
      direction: orderBy === headCell.id ? order : 'asc',
      onClick: createSortHandler(headCell.id)
    }, headCell.label, orderBy === headCell.id ? /*#__PURE__*/_react.default.createElement(_Box.default, {
      component: "span",
      sx: _utils.visuallyHidden
    }, order === 'desc' ? 'sorted descending' : 'sorted ascending') : null));
  })));
}

/**
 * Prop types for the EnhancedTableHead component.
 *
 * @type {Object}
 */
EnhancedTableHead.propTypes = {
  onRequestSort: _propTypes.default.func.isRequired,
  order: _propTypes.default.oneOf(['asc', 'desc']).isRequired,
  orderBy: _propTypes.default.string.isRequired,
  rowCount: _propTypes.default.number.isRequired
};

/**
 * Toolbar component for the table, including a search input.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered component.
 */
function EnhancedTableToolbar(_ref) {
  var onRequestSearch = _ref.onRequestSearch;
  var handleSearch = function handleSearch(event) {
    onRequestSearch(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement(_Toolbar.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    sx: {
      flex: '1 1 100%'
    },
    variant: "h6",
    id: "tableTitle",
    component: "div"
  }, "Course Ratings"), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Filter list"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, null, /*#__PURE__*/_react.default.createElement(_FilterList.default, null))), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Search",
    variant: "outlined",
    onChange: handleSearch
  }));
}

/**
 * Prop types for the EnhancedTableToolbar component.
 *
 * @type {Object}
 */
EnhancedTableToolbar.propTypes = {};

/**
 * React component for displaying and managing course ratings.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
var ViewRatings = function ViewRatings() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _React$useState = _react.default.useState('asc'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    order = _React$useState2[0],
    setOrder = _React$useState2[1];
  var _React$useState3 = _react.default.useState('calories'),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    orderBy = _React$useState4[0],
    setOrderBy = _React$useState4[1];
  var _React$useState5 = _react.default.useState(-1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selected = _React$useState6[0],
    setSelected = _React$useState6[1];
  var _React$useState7 = _react.default.useState(0),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    page = _React$useState8[0],
    setPage = _React$useState8[1];
  var _React$useState9 = _react.default.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    dense = _React$useState10[0],
    setDense = _React$useState10[1];
  var _React$useState11 = _react.default.useState(5),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    rowsPerPage = _React$useState12[0],
    setRowsPerPage = _React$useState12[1];
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    ratingData = _useState2[0],
    setRatingData = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    searchTerm = _useState4[0],
    setSearchTerm = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    filteredData = _useState6[0],
    setFilteredData = _useState6[1];

  /**
   * Effect hook to check if the user is authenticated. Redirects to the login page if not.
   */
  (0, _react.useEffect)(function () {
    if (!sessionStorage.getItem('id')) {
      navigate('/');
    }
  }, []);

  /**
   * Effect hook to fetch ratings data on component mount.
   */
  (0, _react.useEffect)(function () {
    getRatings();
  }, []);

  /**
   * Fetches course ratings data from the API and sets the state accordingly.
   */
  var getRatings = function getRatings() {
    _axios.default.get("".concat(_apiConfig.default, "/getRatings.php")).then(function (res) {
      if (res.data.status === 1) {
        setRatingData(res.data.data.reverse());
        setFilteredData(res.data.data.reverse());

        // Display success toast
        _reactToastify.toast.success('Course ratings fetched successfully!', {
          position: _reactToastify.toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      } else {
        // Display error toast
        _reactToastify.toast.error('Failed to fetch course ratings', {
          position: _reactToastify.toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      }
    });
  };

  /**
   * Handles the request to sort the table based on a specific property.
   *
   * @param {Event} event - The event that triggered the sorting request.
   * @param {string} property - The property to sort by.
   */
  var handleRequestSort = function handleRequestSort(event, property) {
    var isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * Handles the click event on a table row, selecting or deselecting it.
   *
   * @param {Event} event - The event that triggered the click.
   * @param {number} id - The ID of the clicked row.
   */
  var handleClick = function handleClick(event, id) {
    if (id === selected) {
      setSelected(-1);
    } else {
      setSelected(id);
    }
  };

  /**
   * Handles the change in the current page when paginating through the table.
   *
   * @param {Event} event - The event that triggered the page change.
   * @param {number} newPage - The new page number.
   */
  var handleChangePage = function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  /**
   * Handles the change in the number of rows per page.
   *
   * @param {Event} event - The event that triggered the change in rows per page.
   */
  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Handles the change in dense padding for table rows.
   *
   * @param {Event} event - The event that triggered the change in dense padding.
   */
  var handleChangeDense = function handleChangeDense(event) {
    setDense(event.target.checked);
  };

  /**
   * Handles the edit action for a selected row, navigating to the edit page.
   *
   * @param {Event} event - The event that triggered the edit action.
   */
  var handleEdit = function handleEdit(event) {
    if (parseInt(sessionStorage.getItem('role_id')) === 2 || selected !== -1 && ratingData.find(function (rating) {
      return rating.creator_id === parseInt(sessionStorage.getItem('id')) && rating.id === selected;
    })) {
      navigate('/EditACourse', {
        state: ratingData.find(function (rating) {
          return rating.id === selected;
        })
      });
    } else {
      // Display error toast
      _reactToastify.toast.error('Cannot edit this rating', {
        position: _reactToastify.toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });
    }
  };

  /**
   * Handles the delete action for a selected row, sending a request to delete the rating.
   *
   * @param {Event} event - The event that triggered the delete action.
   */
  var handleDelete = function handleDelete(event) {
    if (parseInt(sessionStorage.getItem('role_id')) === 2 || selected !== -1 && ratingData.find(function (rating) {
      return rating.creator_id === parseInt(sessionStorage.getItem('id')) && rating.id === selected;
    })) {
      _axios.default.delete("".concat(_apiConfig.default, "/deleteRating.php/").concat(selected)).then(function (res) {
        if (res.data.status) {
          // Display success toast
          _reactToastify.toast.success('Deleted Rating', {
            position: _reactToastify.toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
          getRatings();
        } else {
          // Display error toast for failed deletion
          _reactToastify.toast.error('Failed to delete Rating', {
            position: _reactToastify.toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
        }
      });
    } else {
      // Display error toast for unauthorized deletion
      _reactToastify.toast.error('Cannot Delete this rating', {
        position: _reactToastify.toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });
    }
  };

  /**
   * Checks if a row is selected based on its ID.
   *
   * @param {number} id - The ID of the row to check.
   * @returns {boolean} - True if the row is selected, otherwise false.
   */
  var isSelected = function isSelected(id) {
    return selected === id;
  };

  /**
   * Handles the search action, filtering the table data based on the search term.
   *
   * @param {string} searchTerm - The term to search for.
   */
  var handleSearch = function handleSearch(searchTerm) {
    setSearchTerm(searchTerm);
    var filtered = ratingData.filter(function (row) {
      return Object.values(row).some(function (value) {
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  /**
   * Determines the data to display in the table, either the filtered data or all data.
   */
  var rowsToDisplay = searchTerm ? filteredData : ratingData;

  /**
   * Calculates the number of empty rows to add to the table to maintain consistent height.
   */
  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsToDisplay.length) : 0;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    sx: {
      width: '100%',
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement(EnhancedTableToolbar, {
    onRequestSearch: handleSearch
  }), /*#__PURE__*/_react.default.createElement(_TableContainer.default, null, /*#__PURE__*/_react.default.createElement(_Table.default, {
    sx: {
      minWidth: 750
    },
    size: dense ? 'small' : 'medium'
  }, /*#__PURE__*/_react.default.createElement(EnhancedTableHead, {
    order: order,
    orderBy: orderBy,
    onRequestSort: handleRequestSort,
    rowCount: rowsToDisplay.length
  }), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, stableSort(rowsToDisplay, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (row, index) {
    var isItemSelected = isSelected(row.id);
    var labelId = "enhanced-table-checkbox-".concat(index);
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      hover: true,
      onClick: function onClick(event) {
        return handleClick(event, row.id);
      },
      role: "checkbox",
      "aria-checked": isItemSelected,
      tabIndex: -1,
      key: row.id,
      selected: isItemSelected
    }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      padding: "checkbox"
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      color: "primary",
      checked: isItemSelected,
      inputProps: {
        'aria-labelledby': labelId
      }
    }), selected === row.id && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (parseInt(sessionStorage.getItem("role_id")) === 2 || selected !== -1 && ratingData.find(function (rating) {
      return rating.creator_id === parseInt(sessionStorage.getItem("id")) && rating.id === selected;
    })) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: "Edit"
    }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      onClick: function onClick(event) {
        return handleEdit(event);
      }
    }, /*#__PURE__*/_react.default.createElement(_Edit.default, null))), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      title: "Delete"
    }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      onClick: function onClick(event) {
        return handleDelete(event);
      }
    }, /*#__PURE__*/_react.default.createElement(_Delete.default, null)))))), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      component: "th",
      id: labelId,
      scope: "row",
      padding: "none"
    }, row.course_name), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.course_code), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.term), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.level), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.rating), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.school_name), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.comments), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.tips_and_tricks));
  }), emptyRows > 0 && /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    style: {
      height: (dense ? 33 : 53) * emptyRows
    }
  }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    colSpan: 6
  }))))), /*#__PURE__*/_react.default.createElement(_TablePagination.default, {
    rowsPerPageOptions: [5, 10, 25],
    component: "div",
    count: rowsToDisplay.length,
    rowsPerPage: rowsPerPage,
    page: page,
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage
  })), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Switch.default, {
      checked: dense,
      onChange: handleChangeDense
    }),
    label: "Dense padding"
  }));
};
var _default = exports.default = ViewRatings;