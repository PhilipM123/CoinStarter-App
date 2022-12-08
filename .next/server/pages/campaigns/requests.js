"use strict";
(() => {
var exports = {};
exports.id = 73;
exports.ids = [73];
exports.modules = {

/***/ 849:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ requests)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(831);
// EXTERNAL MODULE: ./routes.js
var routes = __webpack_require__(215);
// EXTERNAL MODULE: ./components/Layout.js + 1 modules
var Layout = __webpack_require__(544);
// EXTERNAL MODULE: ./ethereum/campaign.js + 1 modules
var ethereum_campaign = __webpack_require__(148);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(508);
;// CONCATENATED MODULE: ./components/RequestRow.js






class RequestRow extends external_react_.Component {
    onApprove = async (event)=>{
        try {
            const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
            const campaign = (0,ethereum_campaign/* default */.Z)(this.props.address);
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
        } catch (err) {}
        routes.Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };
    onFinalise = async (event)=>{
        const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
        const campaign = (0,ethereum_campaign/* default */.Z)(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
        routes.Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };
    render() {
        const { Row , Cell  } = external_semantic_ui_react_.Table;
        const request = this.props.request;
        const readyToFinalise = request.approvalCount > this.props.approvers / 2;
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
            disabled: request.complete,
            positive: readyToFinalise && !request.complete,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: this.props.id
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: request.description
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: web3/* default.utils.fromWei */.Z.utils.fromWei(request.value, "ether")
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: request.recipient
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: `${request.approvalCount}/${this.props.approvers}`
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: request.complete ? null : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                        color: "green",
                        basic: true,
                        onClick: this.onApprove,
                        children: "Approve"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                    children: request.complete ? null : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                        color: "teal",
                        basic: true,
                        onClick: this.onFinalise,
                        children: "Finalise"
                    })
                })
            ]
        });
    }
}
/* harmony default export */ const components_RequestRow = (RequestRow);

;// CONCATENATED MODULE: ./pages/campaigns/requests/index.js







class RequestIndex extends external_react_.Component {
    static async getInitialProps(props) {
        const { address  } = props.query;
        const campaign = (0,ethereum_campaign/* default */.Z)(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const summary = await campaign.methods.getSummary().call();
        const approvers = summary[3];
        const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index)=>{
            return campaign.methods.requests(index).call();
        }));
        return {
            address,
            requests,
            requestCount,
            approvers
        };
    }
    renderRows() {
        return this.props.requests.map((request, index, approvers)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx(components_RequestRow, {
                id: index,
                request: request,
                address: this.props.address,
                approvers: this.props.approvers
            }, index);
        });
    }
    render() {
        const { Header , Row , HeaderCell , Body  } = external_semantic_ui_react_.Table;
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                    children: "Requests"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(routes.Link, {
                    route: `/campaigns/${this.props.address}/requests/new`,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                            floated: "right",
                            style: {
                                marginBottom: 10
                            },
                            primary: true,
                            children: "Add Request"
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Table, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Header, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "ID"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Description"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Amount"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Recipient"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Approval Count"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Approve"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                        children: "Finalise"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Body, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Row, {}),
                                this.renderRows()
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        marginTop: 10
                    },
                    children: `${this.props.requestCount} Requests Found`
                })
            ]
        });
    }
}
/* harmony default export */ const requests = (RequestIndex);


/***/ }),

/***/ 662:
/***/ ((module) => {

module.exports = require("next-routes");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 831:
/***/ ((module) => {

module.exports = require("semantic-ui-react");

/***/ }),

/***/ 519:
/***/ ((module) => {

module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [184,148], () => (__webpack_exec__(849)));
module.exports = __webpack_exports__;

})();