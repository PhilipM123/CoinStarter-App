"use strict";
(() => {
var exports = {};
exports.id = 634;
exports.ids = [634];
exports.modules = {

/***/ 507:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ show)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(831);
// EXTERNAL MODULE: ./components/Layout.js + 1 modules
var Layout = __webpack_require__(544);
// EXTERNAL MODULE: ./ethereum/campaign.js + 1 modules
var ethereum_campaign = __webpack_require__(148);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(508);
// EXTERNAL MODULE: ./routes.js
var routes = __webpack_require__(215);
;// CONCATENATED MODULE: ./components/ContributeForm.js






class ContributeForm extends external_react_.Component {
    state = {
        value: "",
        errorMessage: "",
        loading: false
    };
    onSubmit = async (event)=>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        const address = this.props.address;
        const campaign = (0,ethereum_campaign/* default */.Z)(address);
        try {
            const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3/* default.utils.toWei */.Z.utils.toWei(this.state.value, "ether")
            });
            routes.Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({
                errorMessage: err.message
            });
        }
        this.setState({
            loading: false
        });
    };
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                    children: "Contribute to this campaign!"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Form, {
                    onSubmit: this.onSubmit,
                    error: !!this.state.errorMessage,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Form.Field, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                    style: {
                                        color: "white"
                                    },
                                    children: "Contribution Amount"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Input, {
                                    value: this.state.value,
                                    onChange: (event)=>this.setState({
                                            value: event.target.value
                                        }),
                                    label: "ether",
                                    labelPosition: "right"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Message, {
                            error: true,
                            header: "Error",
                            content: this.state.errorMessage
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                            loading: this.state.loading,
                            primary: true,
                            children: "Contribute!"
                        })
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const components_ContributeForm = (ContributeForm);

;// CONCATENATED MODULE: ./pages/campaigns/show.js








class CampaignShow extends external_react_.Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = (0,ethereum_campaign/* default */.Z)(address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }
    renderCards() {
        const { minimumContribution , balance , requestsCount , approversCount , manager  } = this.props;
        const items = [
            {
                header: manager,
                description: "The manager created this campaign",
                meta: "Address of manager",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: web3/* default.utils.fromWei */.Z.utils.fromWei(balance, "ether"),
                description: "Total funds contributed to the campaign",
                meta: "Campaign Balance"
            },
            {
                header: web3/* default.utils.fromWei */.Z.utils.fromWei(minimumContribution),
                description: "Minimum contribution to fund this campaign in Ether",
                meta: "Minimum Contribution"
            },
            {
                header: requestsCount,
                description: "Number of requests created by campaign manager",
                meta: "Requests"
            },
            {
                header: approversCount,
                description: "Number of contributers to this campaign",
                meta: "Approvers"
            }
        ];
        return /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Card.Group, {
            items: items
        });
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                    children: "Campaign Details"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Grid, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Grid.Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                    width: 10,
                                    children: this.renderCards()
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                    width: 6,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(components_ContributeForm, {
                                        address: this.props.address
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Row, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(routes.Link, {
                                    route: `/campaigns/${this.props.address}/requests`,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Button, {
                                            class: "ui primary button",
                                            primary: true,
                                            children: [
                                                "View Requests",
                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                    "aria-hidden": "true",
                                                    class: "right add circle icon"
                                                })
                                            ]
                                        })
                                    })
                                })
                            })
                        })
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const show = (CampaignShow);


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
var __webpack_exports__ = __webpack_require__.X(0, [184,148], () => (__webpack_exec__(507)));
module.exports = __webpack_exports__;

})();