/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ad3b840a7b4fb946af67";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/assets/scripts/index.js")(__webpack_require__.s = "./src/assets/scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.eot */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot")) + ");\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.woff2 */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.woff */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff")) + ") format(\"woff\"), url(" + escape(__webpack_require__(/*! ./MaterialIcons-Regular.ttf */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf")) + ") format(\"truetype\"); }\n\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: 'liga'; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff")) + ") format(\"woff\");\n  font-weight: 100;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Thin';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Thin.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff")) + ") format(\"woff\");\n  font-weight: 100;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-ThinItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-ThinItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff")) + ") format(\"woff\");\n  font-weight: 300;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Light';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Light.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff")) + ") format(\"woff\");\n  font-weight: 300;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-LightItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-LightItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff")) + ") format(\"woff\");\n  font-weight: 400;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Regular';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Regular.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff")) + ") format(\"woff\");\n  font-weight: 400;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-RegularItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-RegularItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff")) + ") format(\"woff\");\n  font-weight: 500;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Medium';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Medium.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff")) + ") format(\"woff\");\n  font-weight: 500;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-MediumItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-MediumItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff")) + ") format(\"woff\");\n  font-weight: 700;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Bold';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Bold.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff")) + ") format(\"woff\");\n  font-weight: 700;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-BoldItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BoldItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff")) + ") format(\"woff\");\n  font-weight: 900;\n  font-style: normal; }\n\n@font-face {\n  font-family: 'Roboto-Black';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-Black.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff")) + ") format(\"woff\"); }\n\n@font-face {\n  font-family: 'Roboto';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff")) + ") format(\"woff\");\n  font-weight: 900;\n  font-style: italic; }\n\n@font-face {\n  font-family: 'Roboto-BlackItalic';\n  src: url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff2 */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2")) + ") format(\"woff2\"), url(" + escape(__webpack_require__(/*! ../../fonts/roboto/Roboto-BlackItalic.woff */ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff")) + ") format(\"woff\"); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activity-tabs li {\n  padding: 10px 15px;\n  border-bottom: 1px solid #b9b9b9; }\n  .activity-tabs li a {\n    text-decoration: none;\n    font-size: 14px;\n    font-weight: 500;\n    position: relative; }\n  .activity-tabs li .eds-accordion-caret {\n    position: absolute;\n    right: -22px;\n    top: 6px;\n    width: 12px;\n    height: 8px;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n\n.notes-tab {\n  margin-top: 385px; }\n  .notes-tab .eds-accordion-label {\n    background: #dcdcdc !important; }\n  .notes-tab .greyHeading button {\n    color: #426da9; }\n  .notes-tab textarea {\n    resize: none; }\n  .notes-tab .table {\n    padding: 10px; }\n  .notes-tab .cell {\n    font-size: 12px; }\n  .notes-tab .eds-icon {\n    vertical-align: bottom; }\n  .notes-tab .note-btn {\n    border: none;\n    padding: 10px 25px !important;\n    background: #426da9 !important;\n    border-radius: 5px;\n    color: #fff !important;\n    text-transform: capitalize;\n    font-size: 14px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff;\n  text-align: center; }\n\n.bor-left--none {\n  border-left: none; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  font-family: 'Roboto'; }\n\n.container {\n  max-width: 1600px;\n  margin: auto; }\n\n.dis-flex {\n  display: flex; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff;\n  text-align: center; }\n\n.bor-left--none {\n  border-left: none; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  font-family: 'Roboto'; }\n\n.container {\n  max-width: 1600px;\n  margin: auto; }\n\n.dis-flex {\n  display: flex; }\n\n.caselist__cont {\n  width: 77%;\n  margin: 0 auto; }\n\n.caselist__heading {\n  font-size: 20px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #000000; }\n\n.caselist__case {\n  margin: 25px 25px 25px 0;\n  border-radius: 4px;\n  border: solid 1px #cccccc;\n  float: left;\n  width: 23%;\n  max-width: 300px;\n  position: relative; }\n\n.caselist__box {\n  background-color: #f6f6f6;\n  padding: 15px;\n  float: left;\n  width: 87.4%;\n  max-width: 270px;\n  position: relative;\n  border-radius: 4px 4px 0 0; }\n\n.caselist__name {\n  font-size: 15px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #000000; }\n\n.caselist__number {\n  font-size: 14px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #000000; }\n\n.caselist__link {\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #006dbd;\n  margin-top: 10px;\n  float: left; }\n\n.caselist__goicon {\n  margin-left: 5px;\n  width: 9px;\n  height: 14px;\n  float: right; }\n\n.caselist__balance {\n  padding: 5px 0 0; }\n\n.caselist__label {\n  line-height: 1.15;\n  font-size: 13px;\n  font-family: \"Roboto-Bold\";\n  font-weight: normal;\n  color: #333333; }\n\n.caselist__value {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #333333;\n  float: right; }\n\n.caselist__info {\n  padding: 10px 0 10px 15px;\n  float: left;\n  width: 94%;\n  max-width: 285px;\n  min-height: 110px; }\n\n.caselist__infoname {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #af1685;\n  line-height: 1.15; }\n\n.caselist__infotime {\n  font-size: 12px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #888888;\n  text-transform: uppercase;\n  margin-top: 5px;\n  float: left; }\n\n.caselist__user {\n  width: 80%;\n  float: right;\n  padding: 10px 0 0;\n  margin-top: 40px;\n  border-top: solid 1px #dcdcdc;\n  font-size: 13px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #333333;\n  position: absolute;\n  right: 0;\n  bottom: 10px; }\n\n.caselist__profileicon {\n  width: 100px;\n  height: 100px;\n  opacity: 0.3;\n  position: absolute;\n  right: -15px;\n  top: -13px; }\n\n.caselist--nobg {\n  border-bottom: solid 1px #dcdcdc;\n  background: #ffffff; }\n\n.caselist__usericon {\n  width: 14px;\n  height: 14px;\n  margin-right: 5px;\n  float: left; }\n\n.caselist__fileicon {\n  width: 15px;\n  height: 30px;\n  float: left;\n  margin-right: 5px; }\n\n.caselist__diverticon {\n  width: 18px;\n  height: 30px;\n  float: left;\n  margin-right: 5px; }\n\n.caselist__foldericon {\n  width: 18px;\n  height: 30px;\n  float: left;\n  margin-right: 5px; }\n\n.caselist__boldtext {\n  font-size: 13px;\n  font-family: \"Roboto-Bold\";\n  font-weight: normal;\n  color: #af1685; }\n\n.caselist__secondline {\n  font-size: 13px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #af1685;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 88%;\n  float: left; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".text-Cap {\n  text-transform: capitalize; }\n\n.marginBtm20 {\n  margin-bottom: 20px; }\n\n.containerSide {\n  padding: 10px;\n  height: 870px;\n  width: 300px; }\n  .containerSide:last-child {\n    background-color: #f6f6f6;\n    box-shadow: inset 4px 0 5px -4px rgba(0, 0, 0, 0.4); }\n  .containerSide:first-child {\n    padding-top: 15px; }\n\n.containerMiddle {\n  padding: 10px;\n  height: 870px;\n  padding-top: 15px;\n  flex: 1;\n  vertical-align: top; }\n  .containerMiddle eds-card header {\n    border-bottom: 0; }\n  .containerMiddle eds-dropdown {\n    margin-top: 20px; }\n\n.containerFlex {\n  display: flex;\n  justify-content: space-between;\n  height: 1000px; }\n\neds-accordion:first-child {\n  margin-top: 0; }\n\neds-card:first-child {\n  margin-top: 0; }\n\neds-card header h4 {\n  font-weight: 500 !important; }\n\neds-card header div:first-child {\n  display: inline-block; }\n\neds-card header div:last-child {\n  float: right;\n  display: inline-block; }\n\neds-card main {\n  margin: -20px !important;\n  margin-bottom: -15px !important; }\n\neds-dropdown {\n  min-width: 130px; }\n\n.greyHeading button {\n  margin: 0 !important;\n  padding-left: 20px !important;\n  background-color: whitesmoke !important;\n  text-transform: uppercase;\n  color: #6d2077; }\n\n.table {\n  padding: 10px 20px;\n  display: block;\n  width: 100%; }\n\n.row {\n  display: block;\n  width: 100%; }\n\n.cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 13px; }\n  .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .cell:last-child {\n    text-align: right; }\n\n.table.middle .cell {\n  display: inline-block;\n  width: 49%;\n  font-size: 14px;\n  display: inline-block;\n  width: 22%;\n  padding: 5px; }\n  .table.middle .cell:first-child {\n    text-align: left;\n    font-weight: 500; }\n  .table.middle .cell:last-child {\n    text-align: left; }\n\n.table.middle .row {\n  width: 100%; }\n\neds-accordion-panel[aria-expanded=\"false\"] .table {\n  display: none !important; }\n\neds-icon.round-border {\n  background-color: #0e6eb7;\n  border-radius: 50%;\n  text-align: center;\n  width: 21px;\n  height: 21px;\n  vertical-align: text-bottom; }\n  eds-icon.round-border i {\n    font-size: 13px;\n    padding-top: 3px; }\n\nbutton.eds-accordion-label {\n  height: auto !important; }\n\neds-option {\n  display: none; }\n\n.acct-container .table.middle .cell:nth-child(2) {\n  width: 15%; }\n\n.evenHighlight .row:nth-child(even) {\n  background: #f6f6f6; }\n\n[slot=\"slot-header-center\"] {\n  border-bottom: 1px solid #d8d8d8;\n  padding-bottom: 8px; }\n\n.form-switch {\n  display: inline-block;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent; }\n\n.form-switch i {\n  position: relative;\n  display: inline-block;\n  margin-right: .5rem;\n  width: 46px;\n  height: 26px;\n  background-color: #888888;\n  border-radius: 23px;\n  vertical-align: text-bottom;\n  transition: all 0.3s linear;\n  top: 5px;\n  margin-left: 5px; }\n\n.form-switch i::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  width: 42px;\n  height: 22px;\n  background-color: #f6f6f6;\n  border-radius: 11px;\n  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);\n  transition: all 0.25s linear; }\n\n.form-switch i::after {\n  content: \"\";\n  position: absolute;\n  left: 2px;\n  width: 16px;\n  height: 16px;\n  background-color: #888888;\n  border-radius: 11px;\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);\n  transform: translate3d(2px, 2px, 0);\n  transition: all 0.2s ease-in-out;\n  top: 3px; }\n\n.form-switch:active i::after {\n  width: 28px;\n  transform: translate3d(2px, 2px, 0); }\n\n.form-switch:active input:checked + i::after {\n  transform: translate3d(16px, 2px, 0); }\n\n.form-switch input {\n  display: none; }\n\n.form-switch input:checked + i {\n  background-color: #4BD763; }\n\n.form-switch input:checked + i::before {\n  transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }\n\n.form-switch input:checked + i::after {\n  transform: translate3d(22px, 2px, 0); }\n\n.sort-filter {\n  background: #d2e8f9;\n  display: flex;\n  align-items: baseline;\n  flex: 5;\n  padding: 5px 15px; }\n  .sort-filter eds-dropdown {\n    margin: 0; }\n  .sort-filter label {\n    vertical-align: super;\n    font-size: 14px;\n    font-weight: 500; }\n  .sort-filter > div {\n    flex: 1; }\n  .sort-filter > div:first-child {\n    text-align: right;\n    margin-right: 10px; }\n  .sort-filter > div:last-child {\n    text-align: right; }\n\n.acct-container .sort-filter eds-dropdown {\n  min-width: 150px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\n/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\neds-card {\n  display: block;\n  padding: 20px;\n  margin: 20px 0;\n  border: 1px solid #d8d8d8;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-card > h1 {\n    margin-top: 0; }\n  eds-card > h2 {\n    margin-top: 0; }\n  eds-card > h3 {\n    margin-top: 0; }\n  eds-card > h4 {\n    margin-top: 0; }\n  eds-card > h5 {\n    margin-top: 0; }\n  eds-card > h6 {\n    margin-top: 0; }\n  eds-card p {\n    margin-top: 0; }\n    eds-card p:last-child {\n      margin-bottom: 0; }\n  eds-card header {\n    margin: -20px -20px 20px;\n    padding: 12px 20px;\n    border-bottom: 1px solid #d8d8d8; }\n    eds-card header > h1 {\n      margin: 0; }\n    eds-card header > h2 {\n      margin: 0; }\n    eds-card header > h3 {\n      margin: 0; }\n    eds-card header > h4 {\n      margin: 0; }\n    eds-card header > h5 {\n      margin: 0; }\n    eds-card header > h6 {\n      margin: 0; }\n    eds-card header p {\n      margin: 0; }\n  eds-card header.flush {\n    padding: 0; }\n    eds-card header.flush eds-toolbar {\n      border-bottom: 0; }\n  eds-card main {\n    line-height: 1.4rem; }\n  eds-card footer {\n    margin: 20px -20px -20px;\n    padding: 15px 20px;\n    border-top: 1px solid #d8d8d8; }\n    eds-card footer p:last-child {\n      margin: 0; }\n  eds-card footer.flush {\n    padding: 0; }\n    eds-card footer.flush eds-toolbar {\n      border-bottom: 0; }\n\neds-card[background='gray'] {\n  background-color: #f6f6f6; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\n/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\neds-dropdown {\n  position: relative;\n  display: inline-block;\n  text-align: left;\n  vertical-align: bottom; }\n  eds-dropdown .slotted {\n    display: none; }\n  eds-dropdown > label {\n    display: none;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    font-size: 0.88rem;\n    font-weight: 500;\n    line-height: 1rem;\n    margin-bottom: 10px; }\n  eds-dropdown > label.show {\n    display: block; }\n  eds-dropdown .eds-dropdown-trigger {\n    position: relative;\n    display: block;\n    background-color: white;\n    width: 100%;\n    box-sizing: border-box;\n    font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 16px;\n    font-weight: 400;\n    color: #333333;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    padding: 5px 10px;\n    line-height: 1.4rem;\n    min-height: 34px;\n    border: 1px solid #939393;\n    border-radius: 4px;\n    transition: border-color 0.15s ease;\n    outline: none; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder {\n      display: none;\n      color: #b9b9b9;\n      font-weight: 400; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-placeholder.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-trigger .eds-dropdown-arrow {\n      position: absolute;\n      bottom: 14px;\n      right: 10px;\n      display: inline-block;\n      width: 0;\n      height: 0;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-top: 5px solid #426da9; }\n    eds-dropdown .eds-dropdown-trigger::after {\n      content: '';\n      position: absolute;\n      top: -2px;\n      left: -2px;\n      right: -2px;\n      bottom: -2px;\n      border-radius: 4px;\n      border: 2px solid #426da9;\n      opacity: 0;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-trigger:focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-trigger.focus::after {\n    opacity: 1;\n    transition: opacity 0.15s ease; }\n  eds-dropdown .eds-dropdown-options {\n    display: none;\n    opacity: 0;\n    position: absolute;\n    z-index: 1000;\n    top: calc(100% + 8px);\n    width: 100%;\n    background-color: white;\n    border-radius: 4px;\n    border: 1px solid transparent;\n    border: 1px solid #d8d8d8;\n    background-clip: border-box;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);\n    background-clip: padding-box;\n    font-weight: 400;\n    transition: border-color 0.15s ease, opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox {\n      display: none;\n      position: relative;\n      border-bottom: 1px solid #d8d8d8;\n      padding: 5px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox::after {\n        content: '';\n        position: absolute;\n        top: 5px;\n        left: 5px;\n        right: 5px;\n        bottom: 5px;\n        border-radius: 4px;\n        border: 2px solid #426da9;\n        opacity: 0;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox:focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon {\n        position: absolute;\n        top: 10px;\n        right: 12px;\n        width: 20px;\n        height: 20px; }\n        eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox .eds-search-icon svg {\n          fill: #426da9;\n          width: 20px; }\n      eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox input {\n        outline: none;\n        display: block;\n        width: 100%;\n        padding: 5px 10px;\n        border: none;\n        line-height: 1.4rem;\n        font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        font-size: 16px;\n        font-weight: 400;\n        color: #333333;\n        box-sizing: border-box; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.focus::after {\n      opacity: 1;\n      transition: opacity 0.15s ease; }\n    eds-dropdown .eds-dropdown-options .eds-dropdown-searchbox.show {\n      display: block; }\n    eds-dropdown .eds-dropdown-options ul {\n      padding: 5px 0;\n      margin: 2px 0 0;\n      list-style: none;\n      max-height: 280px;\n      overflow: auto; }\n      eds-dropdown .eds-dropdown-options ul li {\n        margin: 0;\n        padding: 10px 20px;\n        white-space: nowrap;\n        cursor: pointer;\n        min-height: 40px;\n        box-sizing: border-box;\n        position: relative;\n        outline: none; }\n        eds-dropdown .eds-dropdown-options ul li::after {\n          content: '';\n          position: absolute;\n          top: 0px;\n          left: 0px;\n          right: 0px;\n          bottom: 0px;\n          border-radius: 0;\n          border: 2px solid #426da9;\n          opacity: 0;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:focus::after {\n          opacity: 1;\n          transition: opacity 0.15s ease; }\n        eds-dropdown .eds-dropdown-options ul li:hover {\n          background-color: #426da9;\n          color: white; }\n        eds-dropdown .eds-dropdown-options ul li eds-checkbox {\n          position: absolute;\n          top: 12px;\n          left: 20px; }\n      eds-dropdown .eds-dropdown-options ul li.focus::after {\n        opacity: 1;\n        transition: opacity 0.15s ease; }\n      eds-dropdown .eds-dropdown-options ul li.eds-checkbox-option {\n        padding-left: 48px; }\n\neds-dropdown.eds-dropdown-open .eds-dropdown-options {\n  display: block;\n  opacity: 1; }\n\neds-dropdown[disabled] {\n  cursor: not-allowed; }\n  eds-dropdown[disabled] .eds-dropdown-trigger {\n    border-color: #cccccc;\n    color: #888888; }\n    eds-dropdown[disabled] .eds-dropdown-trigger:focus {\n      border-color: #cccccc;\n      color: #888888; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus::after {\n        opacity: 0; }\n      eds-dropdown[disabled] .eds-dropdown-trigger:focus .eds-dropdown-arrow {\n        border-top-color: #cccccc; }\n    eds-dropdown[disabled] .eds-dropdown-trigger::after {\n      opacity: 0; }\n    eds-dropdown[disabled] .eds-dropdown-trigger .eds-dropdown-arrow {\n      border-top-color: #cccccc; }\n\n.acct-container eds-dropdown {\n  min-width: 181px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\nbody.eds {\n  display: none;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  color: #333333; }\n  body.eds * {\n    box-sizing: border-box; }\n    body.eds *::before {\n      box-sizing: border-box; }\n    body.eds *::after {\n      box-sizing: border-box; }\n\nbody.eds.eds-show-body {\n  display: block; }\n\n.eds {\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.4em; }\n  .eds a {\n    color: #426da9; }\n    .eds a:hover {\n      color: #163c6f; }\n  .eds h1 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 30px; }\n  .eds h2 {\n    color: #333333;\n    font-weight: 300;\n    line-height: 1.4em;\n    font-size: 24px; }\n  .eds h3 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 18px; }\n  .eds h4 {\n    color: #333333;\n    font-weight: bold;\n    font-size: 16px; }\n  .eds h5 {\n    color: #333333;\n    font-weight: bold; }\n  .eds h1[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 28px; }\n  .eds h2[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 22px; }\n  .eds h3[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 16px; }\n  .eds h4[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 14px; }\n  .eds h5[caps] {\n    text-transform: uppercase;\n    color: #6d2077;\n    font-weight: 400;\n    font-size: 12px; }\n  .eds hr {\n    border: none;\n    border-top: 1px solid #d8d8d8;\n    height: 1px; }\n  .eds .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0; }\n\n[background='gray'] {\n  background-color: #f6f6f6; }\n\n.no-scroll {\n  overflow: hidden; }\n\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n\n.header-container {\n  height: 50px;\n  background: #e6e6e6;\n  display: flex;\n  align-items: center; }\n  .header-container .icon-container {\n    background-color: #f6f6f6;\n    line-height: 0; }\n    .header-container .icon-container .home-icon {\n      background-color: transparent;\n      padding: 17px 23px;\n      margin: 0;\n      color: #426da9;\n      cursor: pointer; }\n      .header-container .icon-container .home-icon:hover {\n        color: #1d4f91; }\n    .header-container .icon-container .home-icon.selected {\n      background-color: #ffffff;\n      color: #333333; }\n  .header-container .tabs-container {\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 100%;\n    max-height: 100%;\n    overflow: hidden; }\n\npcc-eds-secondary-header-tab {\n  background-color: #f6f6f6;\n  border-left: 1px solid #cccccc;\n  display: flex;\n  align-content: space-between;\n  align-items: center;\n  width: 380px;\n  height: 50px; }\n  pcc-eds-secondary-header-tab:last-child {\n    border-right: 1px solid #cccccc; }\n  pcc-eds-secondary-header-tab .info-container {\n    height: 100%;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    color: #426da9; }\n    pcc-eds-secondary-header-tab .info-container eds-icon {\n      margin: 0; }\n    pcc-eds-secondary-header-tab .info-container [icon='person'] {\n      padding: 0 10px 0 20px; }\n    pcc-eds-secondary-header-tab .info-container .person-name {\n      min-width: 172px;\n      font-size: 12px;\n      font-weight: bold;\n      max-height: 100%;\n      line-height: 1.4; }\n  pcc-eds-secondary-header-tab .tab-controls {\n    display: flex;\n    height: 100%;\n    align-items: center; }\n    pcc-eds-secondary-header-tab .tab-controls .close-button {\n      margin: 0 10px 0 5px;\n      padding: 8px;\n      cursor: default;\n      color: #426da9; }\n\npcc-eds-secondary-header-tab[active] {\n  background-color: white; }\n  pcc-eds-secondary-header-tab[active] .info-container {\n    color: #333333; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\n/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\n@keyframes \"eds-spin\" {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\neds-icon[spin] {\n  animation: eds-spin 2s infinite linear; }\n\neds-icon {\n  display: inline-block;\n  line-height: 0 !important;\n  margin: 0 6px 0 0;\n  vertical-align: text-bottom; }\n  eds-icon .material-icons {\n    font-size: inherit; }\n  eds-icon > * {\n    font-size: inherit; }\n\neds-icon.s16 > * {\n  font-size: 16px;\n  vertical-align: bottom; }\n\neds-icon.s18 > * {\n  font-size: 18px;\n  vertical-align: bottom; }\n\neds-icon.s24 > * {\n  font-size: 24px;\n  vertical-align: bottom; }\n\neds-icon.s36 > * {\n  font-size: 36px;\n  vertical-align: bottom; }\n\neds-icon.s48 > * {\n  font-size: 48px;\n  vertical-align: bottom; }\n\neds-icon.s60 > * {\n  font-size: 60px;\n  vertical-align: bottom; }\n\neds-icon[border] {\n  padding: 0.8rem;\n  border: 4px solid #d8d8d8;\n  border-radius: 3px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "eds-tag {\n  display: inline-block;\n  padding: 4px 10px;\n  font-size: 14px;\n  border-radius: 12px;\n  margin-left: 2px;\n  line-height: 1 !important; }\n  eds-tag:not([motif]) {\n    background: #e6e6e6;\n    color: #333333; }\n\neds-tag[motif=\"default\"] {\n  background: #e6e6e6;\n  color: #333333; }\n\neds-tag[motif='error'] {\n  background: #ffdce2;\n  color: #e4002b; }\n\neds-tag[motif='warning'] {\n  background: #fceeba;\n  color: #b35900; }\n\neds-tag[motif='success'] {\n  background: #cdf4d2;\n  color: #007A3B; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\n/*\r\n * These variables are available to all components globally and are thus designated with an \"eds-\" prefix.\r\n * Components may implement these and pass-through to a local variable name.\r\n */\npcc-eds-timeline-item {\n  font-family: \"Roboto\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  color: #333333; }\n  pcc-eds-timeline-item .flex-container {\n    display: flex; }\n  pcc-eds-timeline-item .section-left {\n    flex: 1; }\n  pcc-eds-timeline-item .section-icon {\n    border-left: 1px solid #d8d8d8;\n    margin-left: 53px;\n    min-height: 100px;\n    padding-right: 30px;\n    text-align: center; }\n    pcc-eds-timeline-item .section-icon .icon-circle {\n      background-color: #af1685;\n      border-radius: 50%;\n      color: #ffffff;\n      height: 40px;\n      line-height: 42px;\n      margin-left: -20px;\n      padding-left: 5px;\n      width: 40px; }\n  pcc-eds-timeline-item .section-main {\n    flex: 5;\n    padding-bottom: 10px;\n    padding-top: 10px; }\n    pcc-eds-timeline-item .section-main .placeholder-center {\n      flex: 2; }\n    pcc-eds-timeline-item .section-main .placeholder-right {\n      flex: 1; }\n  pcc-eds-timeline-item [slot=\"slot-header-center\"] {\n    display: flex;\n    flex: 5; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-left\"] {\n      flex: 4; }\n    pcc-eds-timeline-item [slot=\"slot-header-center\"] [slot=\"slot-header-right\"] {\n      flex: 1;\n      font-size: 14px; }\n\npcc-eds-timeline-item:last-child .section-icon {\n  border-left: 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff;\n  text-align: center; }\n\n.bor-left--none {\n  border-left: none; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  font-family: 'Roboto'; }\n\n.container {\n  max-width: 1600px;\n  margin: auto; }\n\n.dis-flex {\n  display: flex; }\n\n.header__logo {\n  width: 109px;\n  height: 36px;\n  margin: 0 15px;\n  padding-right: 20px;\n  border-right: solid 1px #cccccc;\n  float: left; }\n\n.header__logolink {\n  width: 100%;\n  height: 100%;\n  text-indent: -99999em;\n  float: left; }\n\n.header__logodesc {\n  font-size: 16px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #333333;\n  padding: 10px 0;\n  float: left; }\n\n.header__nav {\n  float: right; }\n\n.header__listcont {\n  padding: 0;\n  margin: 0; }\n\n.header__list {\n  float: left;\n  border-left: solid 1px #dcdcdc;\n  padding: 15px; }\n\n.header__link {\n  float: left;\n  font-size: 16px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #426da9;\n  text-decoration: none;\n  position: relative; }\n\n.header__searchicon {\n  width: 18px;\n  height: 18px;\n  float: left;\n  margin-right: 5px; }\n\n.header__nexticon {\n  width: 16px;\n  height: 16px;\n  float: left;\n  margin-right: 5px; }\n\n.header__caselisticon {\n  width: 16px;\n  height: 16px;\n  float: left;\n  margin-right: 5px; }\n\n.header__menuicon {\n  width: 20px;\n  height: 22px;\n  float: left; }\n\n.header__helpicon {\n  width: 22px;\n  height: 22px;\n  float: left; }\n\n.header__messageicon {\n  width: 22px;\n  height: 18px;\n  float: left;\n  margin-top: 3px; }\n\n.header__notificationicon {\n  width: 21px;\n  height: 22px;\n  float: left; }\n\n.header__counter {\n  position: absolute;\n  background: #e20000;\n  width: 21px;\n  height: 17px;\n  border-radius: 50%;\n  top: -7px;\n  right: -7px;\n  padding-top: 3px;\n  text-align: center;\n  font-size: 13px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff; }\n\n.header--userprofile {\n  border: solid 2px #426da9;\n  border-radius: 50%;\n  padding: 6px 5px;\n  font-size: 12px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "eds-accordion {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid #cccccc;\n  border-radius: 6px;\n  background-color: #ffffff; }\n  eds-accordion eds-accordion-panel {\n    border-top: 1px solid #cccccc;\n    position: relative;\n    display: flex;\n    flex-direction: column; }\n    eds-accordion eds-accordion-panel p {\n      transition: padding 100ms ease 0ms, opacity 75ms ease 25ms;\n      padding: 0 20px;\n      margin: 0;\n      font-size: 14px;\n      max-height: 0;\n      opacity: 0; }\n    eds-accordion eds-accordion-panel .eds-accordion-caret {\n      transition: transform 150ms ease 0ms; }\n    eds-accordion eds-accordion-panel .eds-accordion-label {\n      text-align: left;\n      border: 0;\n      height: 40px;\n      padding: 10px 20px;\n      background-color: #f6f6f6;\n      font-weight: 500;\n      font-size: 14px;\n      cursor: pointer; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:focus {\n        outline: none;\n        background-color: #EDF4FA; }\n      eds-accordion eds-accordion-panel .eds-accordion-label:active {\n        outline: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: block; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: none; }\n      eds-accordion eds-accordion-panel .eds-accordion-label .eds-accordion-caret {\n        position: absolute;\n        right: 20px;\n        top: 16px;\n        width: 12px;\n        height: 8px;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxMiA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTIzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4wMDAwMDAsIDEuMDAwMDAwKSByb3RhdGUoLTQ1LjAwMDAwMCkgdHJhbnNsYXRlKC02LjAwMDAwMCwgLTEuMDAwMDAwKSB0cmFuc2xhdGUoMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMwRTZFQjciPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNy4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC03LjAwMDAwMCkgIiB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiByeD0iMSI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+\"); }\n    eds-accordion eds-accordion-panel:first-child {\n      border: 0; }\n    eds-accordion eds-accordion-panel .table {\n      background: #ffffff; }\n  eds-accordion eds-accordion-panel[active=\"true\"] {\n    min-height: 200px; }\n    eds-accordion eds-accordion-panel[active=\"true\"] p {\n      transition: padding 150ms ease 0ms;\n      max-height: none;\n      padding: 24px 20px;\n      opacity: 1; }\n    eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n      background-color: transparent;\n      border-bottom: 1px solid #cccccc;\n      margin: 0 20px;\n      padding: 10px 0;\n      width: auto; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n        display: none; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-sublabel {\n        display: block; }\n      eds-accordion eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-caret {\n        transform: rotate(180deg); }\n  eds-accordion eds-accordion-panel[active] p {\n    transition: padding 150ms ease 0ms;\n    max-height: none;\n    padding: 24px 20px;\n    opacity: 1; }\n  eds-accordion eds-accordion-panel[active] .eds-accordion-label {\n    background-color: transparent;\n    border-bottom: 1px solid #cccccc;\n    padding: 10px 20px;\n    width: auto; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: none; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-sublabel {\n      display: block; }\n    eds-accordion eds-accordion-panel[active] .eds-accordion-label .eds-accordion-caret {\n      transform: rotate(180deg); }\n\neds-accordion[wide] {\n  border-radius: 0; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\neds-accordion[wide=\"true\"] {\n  border-radius: 0; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label {\n    padding: 10px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(1) {\n    display: inline-block;\n    text-transform: uppercase;\n    color: #6d2077; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-label-text:nth-child(2) {\n    display: inline-block;\n    color: #333333;\n    margin-left: 3px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel .eds-accordion-caret {\n    top: 16px;\n    left: 19px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel p {\n    padding: 0 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active] p {\n    padding: 24px 50px 48px 50px; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label {\n    border: 0;\n    padding: 11px 0;\n    margin: 0 50px; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(1) {\n      display: inline-block; }\n    eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] .eds-accordion-label .eds-accordion-label-text:nth-child(2) {\n      display: inline-block; }\n  eds-accordion[wide=\"true\"] eds-accordion-panel[active=\"true\"] p {\n    padding: 24px 50px 48px 50px; }\n\n.eds-greyed {\n  color: #ccc; }\n\n.acct-container .eds-accordion-label .eds-accordion-label-text {\n  vertical-align: super; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff;\n  text-align: center; }\n\n.bor-left--none {\n  border-left: none; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\neds-tabs {\n  display: block; }\n  eds-tabs .tab-labels {\n    border-bottom: 1px solid #cccccc;\n    width: 100%;\n    height: 50px;\n    overflow-x: auto;\n    margin: 0;\n    padding: 0; }\n    eds-tabs .tab-labels li {\n      margin: 0;\n      padding: 0;\n      display: inline-block;\n      text-align: center;\n      line-height: 45px; }\n      eds-tabs .tab-labels li a {\n        padding: 0 20px;\n        width: 100%;\n        font-size: 14px;\n        font-weight: 500;\n        display: block;\n        color: #333333;\n        text-decoration: none; }\n        eds-tabs .tab-labels li a:hover {\n          border-bottom: 4px solid #d8d8d8;\n          color: #426da9; }\n      eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n        border-bottom: 4px solid #e63888;\n        color: #163c6f; }\n  eds-tabs eds-tab {\n    display: none;\n    opacity: 0;\n    transition: opacity .15s linear; }\n    eds-tabs eds-tab:after {\n      content: \" \";\n      display: table; }\n    eds-tabs eds-tab:before {\n      content: \" \";\n      display: table; }\n  eds-tabs eds-tab[active] {\n    display: block;\n    opacity: 1; }\n\neds-tabs[vertical] {\n  display: flex; }\n  eds-tabs[vertical] .tab-labels {\n    height: fit-content;\n    flex: 0 0 180px;\n    border-right: 1px solid #d8d8d8;\n    border-bottom: none; }\n    eds-tabs[vertical] .tab-labels li {\n      height: 50px;\n      line-height: 50px;\n      text-align: left;\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li:last-child {\n        border-bottom: 1px solid #d8d8d8; }\n      eds-tabs[vertical] .tab-labels li a:hover {\n        border-left: 4px solid #d8d8d8;\n        border-bottom: none;\n        padding-left: 16px; }\n      eds-tabs[vertical] .tab-labels li a[aria-selected=\"true\"] {\n        border-left: 4px solid #e63888;\n        border-bottom: none;\n        padding-left: 16px; }\n\n@media only screen and (max-width: 480px) {\n  eds-tabs {\n    display: flex; }\n    eds-tabs .tab-labels {\n      height: fit-content;\n      flex: 0 0 180px;\n      border-right: 1px solid #d8d8d8;\n      border-bottom: none; }\n      eds-tabs .tab-labels li {\n        height: 50px;\n        line-height: 50px;\n        text-align: left;\n        display: block;\n        overflow: hidden;\n        border-top: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li:last-child {\n          border-bottom: 1px solid #d8d8d8; }\n        eds-tabs .tab-labels li a:hover {\n          border-left: 4px solid #d8d8d8;\n          border-bottom: none;\n          padding-left: 16px; }\n        eds-tabs .tab-labels li a[aria-selected=\"true\"] {\n          border-left: 4px solid #e63888;\n          border-bottom: none;\n          padding-left: 16px; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn {\n  width: 120px;\n  padding: 10px 0;\n  border-radius: 4px;\n  background-color: #426da9;\n  border: solid 1px #004590;\n  font-size: 14px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #ffffff;\n  text-align: center; }\n\n.bor-left--none {\n  border-left: none; }\n\n.mar-right--none {\n  margin-right: 0 !important; }\n\n.search__innercont {\n  width: 77%;\n  margin: 35px auto 0 auto; }\n\n.search__heading {\n  font-size: 15px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #000000;\n  line-height: 1.33; }\n\n.search__callstats {\n  float: left;\n  width: 100px;\n  margin: 40px 35px 30px;\n  text-align: center; }\n\n.search__statcount {\n  font-size: 64px;\n  font-family: \"Roboto-Medium\";\n  font-weight: normal;\n  color: #4e4e4e;\n  text-align: center;\n  position: relative; }\n\n.search__statdesc {\n  font-size: 12px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #7a7a7a;\n  text-transform: uppercase;\n  margin-top: 10px;\n  text-align: center;\n  width: 100%; }\n\n.search__percentage {\n  font-size: 18px;\n  font-family: \"Roboto-Bold\";\n  font-weight: normal;\n  color: #333333;\n  line-height: 0.83;\n  position: absolute;\n  bottom: 10px;\n  right: 0px; }\n\n.search--collected {\n  margin: 40px 10px 30px;\n  width: 150px; }\n\n.search__bycont {\n  width: 100%;\n  border-radius: 4px;\n  background-color: #f6f6f6;\n  border: solid 1px #cccccc;\n  float: left;\n  padding: 20px 0;\n  margin-bottom: 40px; }\n\n.search__form {\n  width: 70%;\n  margin: 0 auto; }\n\n.search__input {\n  background-color: #ffffff;\n  border: solid 1px #888888;\n  border-radius: 4px;\n  font-size: 16px;\n  font-family: \"Roboto-Regular\";\n  font-weight: normal;\n  color: #aaaaaa;\n  padding: 5px 0px 5px 10px;\n  margin-right: 10px;\n  width: 24%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\nbody {\n  background: #fff;\n  max-width: 1680px;\n  margin: 0 auto; }\n\n.header {\n  border-bottom: solid 2px #ba2f7d;\n  padding: 10px 0 0 0;\n  float: left;\n  width: 100%; }\n\n.header__logolink {\n  background: url(" + escape(__webpack_require__(/*! ../images/experian__logo.png */ "./src/assets/images/experian__logo.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__searchicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/search__icon.png */ "./src/assets/images/search__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__nexticon {\n  background: url(" + escape(__webpack_require__(/*! ../images/loadnext__icon.png */ "./src/assets/images/loadnext__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__caselisticon {\n  background: url(" + escape(__webpack_require__(/*! ../images/caselist__icon.png */ "./src/assets/images/caselist__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__menuicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/menu__icon.png */ "./src/assets/images/menu__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__helpicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/help__icon.png */ "./src/assets/images/help__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__messageicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/message__icon.png */ "./src/assets/images/message__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.header__notificationicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/notification__icon.png */ "./src/assets/images/notification__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.search {\n  float: left;\n  width: 100%; }\n\n.caselist__goicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/next__icon.png */ "./src/assets/images/next__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__profileicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/profile__icon.png */ "./src/assets/images/profile__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__usericon {\n  background: url(" + escape(__webpack_require__(/*! ../images/user__icon.png */ "./src/assets/images/user__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__fileicon {\n  background: url(" + escape(__webpack_require__(/*! ../images/file__icon.png */ "./src/assets/images/file__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__diverticon {\n  background: url(" + escape(__webpack_require__(/*! ../images/divert__icon.png */ "./src/assets/images/divert__icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n\n.caselist__foldericon {\n  background: url(" + escape(__webpack_require__(/*! ../images/userfolder_icon.png */ "./src/assets/images/userfolder_icon.png")) + ") no-repeat center center transparent;\n  background-size: 100%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.eot";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.ttf";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff":
/*!*************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2":
/*!**************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2 ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/MaterialIcons-Regular.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons.css":
/*!*****************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css", function() {
		var newContent = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js!./material-icons.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/material-icons/iconfont/material-icons.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/roboto-fontface/css/roboto/roboto-fontface.css":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/css/roboto/roboto-fontface.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css", function() {
		var newContent = __webpack_require__(/*! !../../../css-loader!../../../sass-loader/lib/loader.js!./roboto-fontface.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Black.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Black.woff2 ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Black.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BlackItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BlackItalic.woff2 ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BlackItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff":
/*!********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Bold.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Bold.woff2 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Bold.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff":
/*!**************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BoldItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-BoldItalic.woff2 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-BoldItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Light.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Light.woff2 ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Light.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-LightItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-LightItalic.woff2 ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-LightItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff":
/*!**********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Medium.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2":
/*!***********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff2 ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Medium.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff":
/*!****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-MediumItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2":
/*!*****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff2 ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-MediumItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff":
/*!***********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Regular.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2":
/*!************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff2 ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Regular.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff":
/*!*****************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-RegularItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2":
/*!******************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-RegularItalic.woff2 ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-RegularItalic.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff":
/*!********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Thin.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2":
/*!*********************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-Thin.woff2 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Thin.woff2";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff":
/*!**************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-ThinItalic.woff";

/***/ }),

/***/ "./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2":
/*!***************************************************************************!*\
  !*** ./node_modules/roboto-fontface/fonts/roboto/Roboto-ThinItalic.woff2 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-ThinItalic.woff2";

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/assets/images/caselist__icon.png":
/*!**********************************************!*\
  !*** ./src/assets/images/caselist__icon.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/caselist__icon.png";

/***/ }),

/***/ "./src/assets/images/divert__icon.png":
/*!********************************************!*\
  !*** ./src/assets/images/divert__icon.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/divert__icon.png";

/***/ }),

/***/ "./src/assets/images/experian__logo.png":
/*!**********************************************!*\
  !*** ./src/assets/images/experian__logo.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/experian__logo.png";

/***/ }),

/***/ "./src/assets/images/file__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/file__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/file__icon.png";

/***/ }),

/***/ "./src/assets/images/help__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/help__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/help__icon.png";

/***/ }),

/***/ "./src/assets/images/loadnext__icon.png":
/*!**********************************************!*\
  !*** ./src/assets/images/loadnext__icon.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/loadnext__icon.png";

/***/ }),

/***/ "./src/assets/images/menu__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/menu__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/menu__icon.png";

/***/ }),

/***/ "./src/assets/images/message__icon.png":
/*!*********************************************!*\
  !*** ./src/assets/images/message__icon.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/message__icon.png";

/***/ }),

/***/ "./src/assets/images/next__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/next__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/next__icon.png";

/***/ }),

/***/ "./src/assets/images/notification__icon.png":
/*!**************************************************!*\
  !*** ./src/assets/images/notification__icon.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/notification__icon.png";

/***/ }),

/***/ "./src/assets/images/profile__icon.png":
/*!*********************************************!*\
  !*** ./src/assets/images/profile__icon.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/profile__icon.png";

/***/ }),

/***/ "./src/assets/images/search__icon.png":
/*!********************************************!*\
  !*** ./src/assets/images/search__icon.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/search__icon.png";

/***/ }),

/***/ "./src/assets/images/user__icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/user__icon.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/user__icon.png";

/***/ }),

/***/ "./src/assets/images/userfolder_icon.png":
/*!***********************************************!*\
  !*** ./src/assets/images/userfolder_icon.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/src/assets/images/userfolder_icon.png";

/***/ }),

/***/ "./src/assets/scripts/index.js":
/*!*************************************!*\
  !*** ./src/assets/scripts/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var roboto_fontface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! roboto-fontface */ "./node_modules/roboto-fontface/css/roboto/roboto-fontface.css");
/* harmony import */ var roboto_fontface__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(roboto_fontface__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var material_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! material-icons */ "./node_modules/material-icons/iconfont/material-icons.css");
/* harmony import */ var material_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(material_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/app.scss */ "./src/assets/styles/app.scss");
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_app_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/eds-global-styles.scss */ "./src/assets/styles/eds-global-styles.scss");
/* harmony import */ var _styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_global_styles_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/style.css */ "./src/assets/styles/style.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_style_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/header.scss */ "./src/assets/styles/header.scss");
/* harmony import */ var _styles_header_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_header_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/search.scss */ "./src/assets/styles/search.scss");
/* harmony import */ var _styles_search_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_search_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/caseList.scss */ "./src/assets/styles/caseList.scss");
/* harmony import */ var _styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_caseList_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/pcc-eds-secondary-header.scss */ "./src/assets/styles/pcc-eds-secondary-header.scss");
/* harmony import */ var _styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_eds_secondary_header_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/demo-pcc-overview.scss */ "./src/assets/styles/demo-pcc-overview.scss");
/* harmony import */ var _styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_demo_pcc_overview_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/pcc-accordian.scss */ "./src/assets/styles/pcc-accordian.scss");
/* harmony import */ var _styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_pcc_accordian_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/eds-card.scss */ "./src/assets/styles/eds-card.scss");
/* harmony import */ var _styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_card_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/eds-dropdown.scss */ "./src/assets/styles/eds-dropdown.scss");
/* harmony import */ var _styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_dropdown_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/eds-icon.scss */ "./src/assets/styles/eds-icon.scss");
/* harmony import */ var _styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_icon_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/eds-timeline-item.scss */ "./src/assets/styles/eds-timeline-item.scss");
/* harmony import */ var _styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_timeline_item_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/eds-tag.scss */ "./src/assets/styles/eds-tag.scss");
/* harmony import */ var _styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_eds_tag_scss__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../styles/activities.scss */ "./src/assets/styles/activities.scss");
/* harmony import */ var _styles_activities_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_activities_scss__WEBPACK_IMPORTED_MODULE_16__);




















/***/ }),

/***/ "./src/assets/styles/activities.scss":
/*!*******************************************!*\
  !*** ./src/assets/styles/activities.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./activities.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/activities.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/app.scss":
/*!************************************!*\
  !*** ./src/assets/styles/app.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/app.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/caseList.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/caseList.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./caseList.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/caseList.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/demo-pcc-overview.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/demo-pcc-overview.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./demo-pcc-overview.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/demo-pcc-overview.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-card.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/eds-card.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-card.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-card.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-dropdown.scss":
/*!*********************************************!*\
  !*** ./src/assets/styles/eds-dropdown.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-dropdown.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-dropdown.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-global-styles.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/eds-global-styles.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-global-styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-global-styles.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-icon.scss":
/*!*****************************************!*\
  !*** ./src/assets/styles/eds-icon.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-icon.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-icon.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-tag.scss":
/*!****************************************!*\
  !*** ./src/assets/styles/eds-tag.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-tag.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-tag.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/eds-timeline-item.scss":
/*!**************************************************!*\
  !*** ./src/assets/styles/eds-timeline-item.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./eds-timeline-item.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/eds-timeline-item.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/header.scss":
/*!***************************************!*\
  !*** ./src/assets/styles/header.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/pcc-accordian.scss":
/*!**********************************************!*\
  !*** ./src/assets/styles/pcc-accordian.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-accordian.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-accordian.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/pcc-eds-secondary-header.scss":
/*!*********************************************************!*\
  !*** ./src/assets/styles/pcc-eds-secondary-header.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./pcc-eds-secondary-header.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/pcc-eds-secondary-header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/search.scss":
/*!***************************************!*\
  !*** ./src/assets/styles/search.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./search.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/search.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/styles/style.css":
/*!*************************************!*\
  !*** ./src/assets/styles/style.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./style.css */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/assets/styles/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2Nzcy9yb2JvdG8vcm9ib3RvLWZvbnRmYWNlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvY2FzZUxpc3Quc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1jYXJkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWRyb3Bkb3duLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWdsb2JhbC1zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtaWNvbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy10YWcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtdGltZWxpbmUtaXRlbS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2hlYWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3BjYy1hY2NvcmRpYW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zZWFyY2guc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3M/MWU5YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2Nzcy9yb2JvdG8vcm9ib3RvLWZvbnRmYWNlLmNzcz8zMTZiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1CbGFjay53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLUJvbGQud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1Cb2xkSXRhbGljLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1MaWdodC53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW0ud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tUmVndWxhci53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tUmVndWxhckl0YWxpYy53b2ZmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb2JvdG8tZm9udGZhY2UvZm9udHMvcm9ib3RvL1JvYm90by1UaGluLndvZmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW4ud29mZjIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvYm90by1mb250ZmFjZS9mb250cy9yb2JvdG8vUm9ib3RvLVRoaW5JdGFsaWMud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm9ib3RvLWZvbnRmYWNlL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9jYXNlbGlzdF9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvZGl2ZXJ0X19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9leHBlcmlhbl9fbG9nby5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvZmlsZV9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaGVscF9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvbG9hZG5leHRfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL21lbnVfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL21lc3NhZ2VfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL25leHRfX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL25vdGlmaWNhdGlvbl9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvcHJvZmlsZV9faWNvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvc2VhcmNoX19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyX19pY29uLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyZm9sZGVyX2ljb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3M/NDcxMSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz8xNzdlIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Nhc2VMaXN0LnNjc3M/MTE2MyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9kZW1vLXBjYy1vdmVydmlldy5zY3NzPzQzZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWNhcmQuc2Nzcz9hODA0Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1kcm9wZG93bi5zY3NzPzRmYWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvZWRzLWdsb2JhbC1zdHlsZXMuc2Nzcz9lNGVjIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL2Vkcy1pY29uLnNjc3M/Yjk0MSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtdGFnLnNjc3M/MTA5OSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9lZHMtdGltZWxpbmUtaXRlbS5zY3NzPzJmM2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvaGVhZGVyLnNjc3M/YjI3ZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wY2MtYWNjb3JkaWFuLnNjc3M/YmZmYSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzcz8zYzQ5Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzL3NlYXJjaC5zY3NzPzJkYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzPzI4NjYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7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QUFtQixtQkFBTyxDQUFDLGdOQUF5Rzs7QUFFcEksb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEMiLCJmaWxlIjoiYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHQ7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhZDNiODQwYTdiNGZiOTQ2YWY2N1wiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvYXNzZXRzL3NjcmlwdHMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hc3NldHMvc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL01hdGVyaWFsSWNvbnMtUmVndWxhci5lb3RcIikpICsgXCIpO1xcbiAgLyogRm9yIElFNi04ICovXFxuICBzcmM6IGxvY2FsKFxcXCJNYXRlcmlhbCBJY29uc1xcXCIpLCBsb2NhbChcXFwiTWF0ZXJpYWxJY29ucy1SZWd1bGFyXFxcIiksIHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuL01hdGVyaWFsSWNvbnMtUmVndWxhci50dGZcIikpICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTsgfVxcblxcbi5tYXRlcmlhbC1pY29ucyB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLyogU3VwcG9ydCBmb3IgYWxsIFdlYktpdCBicm93c2Vycy4gKi9cXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLyogU3VwcG9ydCBmb3IgU2FmYXJpIGFuZCBDaHJvbWUuICovXFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgLyogU3VwcG9ydCBmb3IgRmlyZWZveC4gKi9cXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAvKiBTdXBwb3J0IGZvciBJRS4gKi9cXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogJ2xpZ2EnOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbi53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbi53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLVRoaW4nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbi53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbi53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLVRoaW5JdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tVGhpbkl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tTGlnaHQnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHQud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUxpZ2h0LndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1MaWdodEl0YWxpYyc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1SZWd1bGFyJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXIud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1SZWd1bGFySXRhbGljJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tTWVkaXVtJztcXG4gIHNyYzogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bS53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tTWVkaXVtLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLU1lZGl1bUl0YWxpYyc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1NZWRpdW1JdGFsaWMud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUJvbGQnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZC53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7IH1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvLUJvbGRJdGFsaWMnO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQm9sZEl0YWxpYy53b2ZmXCIpKSArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2sud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8tQmxhY2snO1xcbiAgc3JjOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2sud29mZjJcIikpICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi9mb250cy9yb2JvdG8vUm9ib3RvLUJsYWNrLndvZmZcIikpICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFja0l0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgZm9udC1zdHlsZTogaXRhbGljOyB9XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90by1CbGFja0l0YWxpYyc7XFxuICBzcmM6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vLi4vZm9udHMvcm9ib3RvL1JvYm90by1CbGFja0l0YWxpYy53b2ZmMlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uLy4uL2ZvbnRzL3JvYm90by9Sb2JvdG8tQmxhY2tJdGFsaWMud29mZlwiKSkgKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hY3Rpdml0eS10YWJzIGxpIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYjliOWI5OyB9XFxuICAuYWN0aXZpdHktdGFicyBsaSBhIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmFjdGl2aXR5LXRhYnMgbGkgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAtMjJweDtcXG4gICAgdG9wOiA2cHg7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlNVEp3ZUNJZ2FHVnBaMmgwUFNJM2NIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1pQTNJaUIyWlhKemFXOXVQU0l4TGpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpUGdvZ0lDQWdQQ0V0TFNCSFpXNWxjbUYwYjNJNklGTnJaWFJqYUNBME9DNHlJQ2cwTnpNeU55a2dMU0JvZEhSd09pOHZkM2QzTG1KdmFHVnRhV0Z1WTI5a2FXNW5MbU52YlM5emEyVjBZMmdnTFMwK0NpQWdJQ0E4ZEdsMGJHVStSM0p2ZFhBZ01qd3ZkR2wwYkdVK0NpQWdJQ0E4WkdWell6NURjbVZoZEdWa0lIZHBkR2dnVTJ0bGRHTm9Mand2WkdWell6NEtJQ0FnSUR4a1pXWnpQand2WkdWbWN6NEtJQ0FnSUR4bklHbGtQU0pRWVdkbExUSXpJaUJ6ZEhKdmEyVTlJbTV2Ym1VaUlITjBjbTlyWlMxM2FXUjBhRDBpTVNJZ1ptbHNiRDBpYm05dVpTSWdabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJajRLSUNBZ0lDQWdJQ0E4WnlCcFpEMGlSM0p2ZFhBdE1pSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTmk0d01EQXdNREFzSURFdU1EQXdNREF3S1NCeWIzUmhkR1VvTFRRMUxqQXdNREF3TUNrZ2RISmhibk5zWVhSbEtDMDJMakF3TURBd01Dd2dMVEV1TURBd01EQXdLU0IwY21GdWMyeGhkR1VvTWk0d01EQXdNREFzSUMwekxqQXdNREF3TUNraUlHWnBiR3c5SWlNd1JUWkZRamNpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCcFpEMGlVbVZqZEdGdVoyeGxMVElpSUhnOUlqQWlJSGs5SWpBaUlIZHBaSFJvUFNJeUlpQm9aV2xuYUhROUlqZ2lJSEo0UFNJeElqNDhMM0psWTNRK0NpQWdJQ0FnSUNBZ0lDQWdJRHh5WldOMElHbGtQU0pTWldOMFlXNW5iR1V0TWkxRGIzQjVJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnMExqQXdNREF3TUN3Z055NHdNREF3TURBcElISnZkR0YwWlNnNU1DNHdNREF3TURBcElIUnlZVzV6YkdGMFpTZ3ROQzR3TURBd01EQXNJQzAzTGpBd01EQXdNQ2tnSWlCNFBTSXpJaUI1UFNJeklpQjNhV1IwYUQwaU1pSWdhR1ZwWjJoMFBTSTRJaUJ5ZUQwaU1TSStQQzl5WldOMFBnb2dJQ0FnSUNBZ0lEd3ZaejRLSUNBZ0lEd3ZaejRLUEM5emRtYytcXFwiKTsgfVxcblxcbi5ub3Rlcy10YWIge1xcbiAgbWFyZ2luLXRvcDogMzg1cHg7IH1cXG4gIC5ub3Rlcy10YWIgLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBiYWNrZ3JvdW5kOiAjZGNkY2RjICFpbXBvcnRhbnQ7IH1cXG4gIC5ub3Rlcy10YWIgLmdyZXlIZWFkaW5nIGJ1dHRvbiB7XFxuICAgIGNvbG9yOiAjNDI2ZGE5OyB9XFxuICAubm90ZXMtdGFiIHRleHRhcmVhIHtcXG4gICAgcmVzaXplOiBub25lOyB9XFxuICAubm90ZXMtdGFiIC50YWJsZSB7XFxuICAgIHBhZGRpbmc6IDEwcHg7IH1cXG4gIC5ub3Rlcy10YWIgLmNlbGwge1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5ub3Rlcy10YWIgLmVkcy1pY29uIHtcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgfVxcbiAgLm5vdGVzLXRhYiAubm90ZS1idG4ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHggMjVweCAhaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kOiAjNDI2ZGE5ICFpbXBvcnRhbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJ0biB7XFxuICB3aWR0aDogMTIwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI2ZGE5O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzAwNDU5MDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4uYm9yLWxlZnQtLW5vbmUge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4ubWFyLXJpZ2h0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7IH1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogMTYwMHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuLmRpcy1mbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5idG4ge1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTBweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNmRhOTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMwMDQ1OTA7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmJvci1sZWZ0LS1ub25lIHtcXG4gIGJvcmRlci1sZWZ0OiBub25lOyB9XFxuXFxuLm1hci1yaWdodC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nOyB9XFxuXFxuLmNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDE2MDBweDtcXG4gIG1hcmdpbjogYXV0bzsgfVxcblxcbi5kaXMtZmxleCB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLmNhc2VsaXN0X19jb250IHtcXG4gIHdpZHRoOiA3NyU7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5jYXNlbGlzdF9faGVhZGluZyB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5jYXNlbGlzdF9fY2FzZSB7XFxuICBtYXJnaW46IDI1cHggMjVweCAyNXB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMjMlO1xcbiAgbWF4LXdpZHRoOiAzMDBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5jYXNlbGlzdF9fYm94IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogODcuNCU7XFxuICBtYXgtd2lkdGg6IDI3MHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7IH1cXG5cXG4uY2FzZWxpc3RfX25hbWUge1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tTWVkaXVtXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5jYXNlbGlzdF9fbnVtYmVyIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmNhc2VsaXN0X19saW5rIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICMwMDZkYmQ7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4uY2FzZWxpc3RfX2dvaWNvbiB7XFxuICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgd2lkdGg6IDlweDtcXG4gIGhlaWdodDogMTRweDtcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5jYXNlbGlzdF9fYmFsYW5jZSB7XFxuICBwYWRkaW5nOiA1cHggMCAwOyB9XFxuXFxuLmNhc2VsaXN0X19sYWJlbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLUJvbGRcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuLmNhc2VsaXN0X192YWx1ZSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5jYXNlbGlzdF9faW5mbyB7XFxuICBwYWRkaW5nOiAxMHB4IDAgMTBweCAxNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogOTQlO1xcbiAgbWF4LXdpZHRoOiAyODVweDtcXG4gIG1pbi1oZWlnaHQ6IDExMHB4OyB9XFxuXFxuLmNhc2VsaXN0X19pbmZvbmFtZSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogI2FmMTY4NTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyB9XFxuXFxuLmNhc2VsaXN0X19pbmZvdGltZSB7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjODg4ODg4O1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmNhc2VsaXN0X191c2VyIHtcXG4gIHdpZHRoOiA4MCU7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBwYWRkaW5nOiAxMHB4IDAgMDtcXG4gIG1hcmdpbi10b3A6IDQwcHg7XFxuICBib3JkZXItdG9wOiBzb2xpZCAxcHggI2RjZGNkYztcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDEwcHg7IH1cXG5cXG4uY2FzZWxpc3RfX3Byb2ZpbGVpY29uIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBvcGFjaXR5OiAwLjM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogLTE1cHg7XFxuICB0b3A6IC0xM3B4OyB9XFxuXFxuLmNhc2VsaXN0LS1ub2JnIHtcXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGNkY2RjO1xcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjsgfVxcblxcbi5jYXNlbGlzdF9fdXNlcmljb24ge1xcbiAgd2lkdGg6IDE0cHg7XFxuICBoZWlnaHQ6IDE0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmNhc2VsaXN0X19maWxlaWNvbiB7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7IH1cXG5cXG4uY2FzZWxpc3RfX2RpdmVydGljb24ge1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogNXB4OyB9XFxuXFxuLmNhc2VsaXN0X19mb2xkZXJpY29uIHtcXG4gIHdpZHRoOiAxOHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDsgfVxcblxcbi5jYXNlbGlzdF9fYm9sZHRleHQge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tQm9sZFxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICNhZjE2ODU7IH1cXG5cXG4uY2FzZWxpc3RfX3NlY29uZGxpbmUge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8tUmVndWxhclxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICNhZjE2ODU7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd2lkdGg6IDg4JTtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGV4dC1DYXAge1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7IH1cXG5cXG4ubWFyZ2luQnRtMjAge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcblxcbi5jb250YWluZXJTaWRlIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBoZWlnaHQ6IDg3MHB4O1xcbiAgd2lkdGg6IDMwMHB4OyB9XFxuICAuY29udGFpbmVyU2lkZTpsYXN0LWNoaWxkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgNHB4IDAgNXB4IC00cHggcmdiYSgwLCAwLCAwLCAwLjQpOyB9XFxuICAuY29udGFpbmVyU2lkZTpmaXJzdC1jaGlsZCB7XFxuICAgIHBhZGRpbmctdG9wOiAxNXB4OyB9XFxuXFxuLmNvbnRhaW5lck1pZGRsZSB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgaGVpZ2h0OiA4NzBweDtcXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgZmxleDogMTtcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7IH1cXG4gIC5jb250YWluZXJNaWRkbGUgZWRzLWNhcmQgaGVhZGVyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogMDsgfVxcbiAgLmNvbnRhaW5lck1pZGRsZSBlZHMtZHJvcGRvd24ge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuXFxuLmNvbnRhaW5lckZsZXgge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGhlaWdodDogMTAwMHB4OyB9XFxuXFxuZWRzLWFjY29yZGlvbjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAwOyB9XFxuXFxuZWRzLWNhcmQ6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDsgfVxcblxcbmVkcy1jYXJkIGhlYWRlciBoNCB7XFxuICBmb250LXdlaWdodDogNTAwICFpbXBvcnRhbnQ7IH1cXG5cXG5lZHMtY2FyZCBoZWFkZXIgZGl2OmZpcnN0LWNoaWxkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbmVkcy1jYXJkIGhlYWRlciBkaXY6bGFzdC1jaGlsZCB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG5lZHMtY2FyZCBtYWluIHtcXG4gIG1hcmdpbjogLTIwcHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNXB4ICFpbXBvcnRhbnQ7IH1cXG5cXG5lZHMtZHJvcGRvd24ge1xcbiAgbWluLXdpZHRoOiAxMzBweDsgfVxcblxcbi5ncmV5SGVhZGluZyBidXR0b24ge1xcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHggIWltcG9ydGFudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2UgIWltcG9ydGFudDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBjb2xvcjogIzZkMjA3NzsgfVxcblxcbi50YWJsZSB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLmNlbGwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDQ5JTtcXG4gIGZvbnQtc2l6ZTogMTNweDsgfVxcbiAgLmNlbGw6Zmlyc3QtY2hpbGQge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAuY2VsbDpsYXN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4udGFibGUubWlkZGxlIC5jZWxsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA0OSU7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMjIlO1xcbiAgcGFkZGluZzogNXB4OyB9XFxuICAudGFibGUubWlkZGxlIC5jZWxsOmZpcnN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLnRhYmxlLm1pZGRsZSAuY2VsbDpsYXN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcblxcbi50YWJsZS5taWRkbGUgLnJvdyB7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbmVkcy1hY2NvcmRpb24tcGFuZWxbYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiXSAudGFibGUge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuZWRzLWljb24ucm91bmQtYm9yZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZTZlYjc7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMjFweDtcXG4gIGhlaWdodDogMjFweDtcXG4gIHZlcnRpY2FsLWFsaWduOiB0ZXh0LWJvdHRvbTsgfVxcbiAgZWRzLWljb24ucm91bmQtYm9yZGVyIGkge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIHBhZGRpbmctdG9wOiAzcHg7IH1cXG5cXG5idXR0b24uZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDsgfVxcblxcbmVkcy1vcHRpb24ge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5hY2N0LWNvbnRhaW5lciAudGFibGUubWlkZGxlIC5jZWxsOm50aC1jaGlsZCgyKSB7XFxuICB3aWR0aDogMTUlOyB9XFxuXFxuLmV2ZW5IaWdobGlnaHQgLnJvdzpudGgtY2hpbGQoZXZlbikge1xcbiAgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcblxcbltzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q4ZDhkODtcXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7IH1cXG5cXG4uZm9ybS1zd2l0Y2gge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcblxcbi5mb3JtLXN3aXRjaCBpIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1yaWdodDogLjVyZW07XFxuICB3aWR0aDogNDZweDtcXG4gIGhlaWdodDogMjZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ODg4ODg7XFxuICBib3JkZXItcmFkaXVzOiAyM3B4O1xcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgbGluZWFyO1xcbiAgdG9wOiA1cHg7XFxuICBtYXJnaW4tbGVmdDogNXB4OyB9XFxuXFxuLmZvcm0tc3dpdGNoIGk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogNDJweDtcXG4gIGhlaWdodDogMjJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItcmFkaXVzOiAxMXB4O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgycHgsIDJweCwgMCkgc2NhbGUzZCgxLCAxLCAxKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBsaW5lYXI7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAycHg7XFxuICB3aWR0aDogMTZweDtcXG4gIGhlaWdodDogMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ODg4ODg7XFxuICBib3JkZXItcmFkaXVzOiAxMXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDJweCwgMnB4LCAwKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgdG9wOiAzcHg7IH1cXG5cXG4uZm9ybS1zd2l0Y2g6YWN0aXZlIGk6OmFmdGVyIHtcXG4gIHdpZHRoOiAyOHB4O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgycHgsIDJweCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2g6YWN0aXZlIGlucHV0OmNoZWNrZWQgKyBpOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE2cHgsIDJweCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaW5wdXQge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5mb3JtLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgaSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNEJENzYzOyB9XFxuXFxuLmZvcm0tc3dpdGNoIGlucHV0OmNoZWNrZWQgKyBpOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxOHB4LCAycHgsIDApIHNjYWxlM2QoMCwgMCwgMCk7IH1cXG5cXG4uZm9ybS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIGk6OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMjJweCwgMnB4LCAwKTsgfVxcblxcbi5zb3J0LWZpbHRlciB7XFxuICBiYWNrZ3JvdW5kOiAjZDJlOGY5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIGZsZXg6IDU7XFxuICBwYWRkaW5nOiA1cHggMTVweDsgfVxcbiAgLnNvcnQtZmlsdGVyIGVkcy1kcm9wZG93biB7XFxuICAgIG1hcmdpbjogMDsgfVxcbiAgLnNvcnQtZmlsdGVyIGxhYmVsIHtcXG4gICAgdmVydGljYWwtYWxpZ246IHN1cGVyO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdiB7XFxuICAgIGZsZXg6IDE7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdjpmaXJzdC1jaGlsZCB7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7IH1cXG4gIC5zb3J0LWZpbHRlciA+IGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLnNvcnQtZmlsdGVyIGVkcy1kcm9wZG93biB7XFxuICBtaW4td2lkdGg6IDE1MHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKlxcclxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXHJcXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxyXFxuICovXFxuLypcXHJcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxyXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcclxcbiAqL1xcbmVkcy1jYXJkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIG1hcmdpbjogMjBweCAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2Q4ZDhkODtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cXG4gIGVkcy1jYXJkID4gaDEge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCA+IGgyIHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgPiBoMyB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkID4gaDQge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICBlZHMtY2FyZCA+IGg1IHtcXG4gICAgbWFyZ2luLXRvcDogMDsgfVxcbiAgZWRzLWNhcmQgPiBoNiB7XFxuICAgIG1hcmdpbi10b3A6IDA7IH1cXG4gIGVkcy1jYXJkIHAge1xcbiAgICBtYXJnaW4tdG9wOiAwOyB9XFxuICAgIGVkcy1jYXJkIHA6bGFzdC1jaGlsZCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxcbiAgZWRzLWNhcmQgaGVhZGVyIHtcXG4gICAgbWFyZ2luOiAtMjBweCAtMjBweCAyMHB4O1xcbiAgICBwYWRkaW5nOiAxMnB4IDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGgxIHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDIge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoMyB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciA+IGg0IHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyID4gaDUge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgICBlZHMtY2FyZCBoZWFkZXIgPiBoNiB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIGVkcy1jYXJkIGhlYWRlciBwIHtcXG4gICAgICBtYXJnaW46IDA7IH1cXG4gIGVkcy1jYXJkIGhlYWRlci5mbHVzaCB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgZWRzLWNhcmQgaGVhZGVyLmZsdXNoIGVkcy10b29sYmFyIHtcXG4gICAgICBib3JkZXItYm90dG9tOiAwOyB9XFxuICBlZHMtY2FyZCBtYWluIHtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNHJlbTsgfVxcbiAgZWRzLWNhcmQgZm9vdGVyIHtcXG4gICAgbWFyZ2luOiAyMHB4IC0yMHB4IC0yMHB4O1xcbiAgICBwYWRkaW5nOiAxNXB4IDIwcHg7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgIGVkcy1jYXJkIGZvb3RlciBwOmxhc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbjogMDsgfVxcbiAgZWRzLWNhcmQgZm9vdGVyLmZsdXNoIHtcXG4gICAgcGFkZGluZzogMDsgfVxcbiAgICBlZHMtY2FyZCBmb290ZXIuZmx1c2ggZWRzLXRvb2xiYXIge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDA7IH1cXG5cXG5lZHMtY2FyZFtiYWNrZ3JvdW5kPSdncmF5J10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypcXHJcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxyXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcclxcbiAqL1xcbi8qXFxyXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcclxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXHJcXG4gKi9cXG5lZHMtZHJvcGRvd24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG4gIGVkcy1kcm9wZG93biAuc2xvdHRlZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIGVkcy1kcm9wZG93biA+IGxhYmVsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXNpemU6IDAuODhyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxcmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuICBlZHMtZHJvcGRvd24gPiBsYWJlbC5zaG93IHtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBsaW5lLWhlaWdodDogMS40cmVtO1xcbiAgICBtaW4taGVpZ2h0OiAzNHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTM5MzkzO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xcbiAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1wbGFjZWhvbGRlciB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBjb2xvcjogI2I5YjliOTtcXG4gICAgICBmb250LXdlaWdodDogNDAwOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXIgLmVkcy1kcm9wZG93bi1wbGFjZWhvbGRlci5zaG93IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBib3R0b206IDE0cHg7XFxuICAgICAgcmlnaHQ6IDEwcHg7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCAjNDI2ZGE5OyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAtMnB4O1xcbiAgICAgIGxlZnQ6IC0ycHg7XFxuICAgICAgcmlnaHQ6IC0ycHg7XFxuICAgICAgYm90dG9tOiAtMnB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjNDI2ZGE5O1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6Zm9jdXM6OmFmdGVyIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tdHJpZ2dlci5mb2N1czo6YWZ0ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDEwMDA7XFxuICAgIHRvcDogY2FsYygxMDAlICsgOHB4KTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IGJvcmRlci1ib3g7XFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveCB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgICAgcGFkZGluZzogNXB4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDVweDtcXG4gICAgICAgIGxlZnQ6IDVweDtcXG4gICAgICAgIHJpZ2h0OiA1cHg7XFxuICAgICAgICBib3R0b206IDVweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM0MjZkYTk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveDpmb2N1czo6YWZ0ZXIge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgLmVkcy1kcm9wZG93bi1zZWFyY2hib3ggLmVkcy1zZWFyY2gtaWNvbiB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICByaWdodDogMTJweDtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4OyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IC5lZHMtc2VhcmNoLWljb24gc3ZnIHtcXG4gICAgICAgICAgZmlsbDogIzQyNmRhOTtcXG4gICAgICAgICAgd2lkdGg6IDIwcHg7IH1cXG4gICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94IGlucHV0IHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMS40cmVtO1xcbiAgICAgICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIC5lZHMtZHJvcGRvd24tc2VhcmNoYm94LmZvY3VzOjphZnRlciB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyAuZWRzLWRyb3Bkb3duLXNlYXJjaGJveC5zaG93IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIHtcXG4gICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICBtYXJnaW46IDJweCAwIDA7XFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICBtYXgtaGVpZ2h0OiAyODBweDtcXG4gICAgICBvdmVyZmxvdzogYXV0bzsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQwcHg7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTo6YWZ0ZXIge1xcbiAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB0b3A6IDBweDtcXG4gICAgICAgICAgbGVmdDogMHB4O1xcbiAgICAgICAgICByaWdodDogMHB4O1xcbiAgICAgICAgICBib3R0b206IDBweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzQyNmRhOTtcXG4gICAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOyB9XFxuICAgICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpOmZvY3VzOjphZnRlciB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaTpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MjZkYTk7XFxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTsgfVxcbiAgICAgICAgZWRzLWRyb3Bkb3duIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB1bCBsaSBlZHMtY2hlY2tib3gge1xcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgIHRvcDogMTJweDtcXG4gICAgICAgICAgbGVmdDogMjBweDsgfVxcbiAgICAgIGVkcy1kcm9wZG93biAuZWRzLWRyb3Bkb3duLW9wdGlvbnMgdWwgbGkuZm9jdXM6OmFmdGVyIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7IH1cXG4gICAgICBlZHMtZHJvcGRvd24gLmVkcy1kcm9wZG93bi1vcHRpb25zIHVsIGxpLmVkcy1jaGVja2JveC1vcHRpb24ge1xcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA0OHB4OyB9XFxuXFxuZWRzLWRyb3Bkb3duLmVkcy1kcm9wZG93bi1vcGVuIC5lZHMtZHJvcGRvd24tb3B0aW9ucyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG5lZHMtZHJvcGRvd25bZGlzYWJsZWRdIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7IH1cXG4gIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjY2NjO1xcbiAgICBjb2xvcjogIzg4ODg4ODsgfVxcbiAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjpmb2N1cyB7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjY2NjY2NjO1xcbiAgICAgIGNvbG9yOiAjODg4ODg4OyB9XFxuICAgICAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6Zm9jdXM6OmFmdGVyIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7IH1cXG4gICAgICBlZHMtZHJvcGRvd25bZGlzYWJsZWRdIC5lZHMtZHJvcGRvd24tdHJpZ2dlcjpmb2N1cyAuZWRzLWRyb3Bkb3duLWFycm93IHtcXG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICNjY2NjY2M7IH1cXG4gICAgZWRzLWRyb3Bkb3duW2Rpc2FibGVkXSAuZWRzLWRyb3Bkb3duLXRyaWdnZXI6OmFmdGVyIHtcXG4gICAgICBvcGFjaXR5OiAwOyB9XFxuICAgIGVkcy1kcm9wZG93bltkaXNhYmxlZF0gLmVkcy1kcm9wZG93bi10cmlnZ2VyIC5lZHMtZHJvcGRvd24tYXJyb3cge1xcbiAgICAgIGJvcmRlci10b3AtY29sb3I6ICNjY2NjY2M7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgZWRzLWRyb3Bkb3duIHtcXG4gIG1pbi13aWR0aDogMTgxcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBrZXlmcmFtZXMgXFxcImVkcy1zcGluXFxcIiB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXFxuYm9keS5lZHMge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgYm9keS5lZHMgKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gICAgYm9keS5lZHMgKjo6YmVmb3JlIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAgIGJvZHkuZWRzICo6OmFmdGVyIHtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuYm9keS5lZHMuZWRzLXNob3ctYm9keSB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5lZHMge1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTsgfVxcbiAgLmVkcyBhIHtcXG4gICAgY29sb3I6ICM0MjZkYTk7IH1cXG4gICAgLmVkcyBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzE2M2M2ZjsgfVxcbiAgLmVkcyBoMSB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMzBweDsgfVxcbiAgLmVkcyBoMiB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogMzAwO1xcbiAgICBsaW5lLWhlaWdodDogMS40ZW07XFxuICAgIGZvbnQtc2l6ZTogMjRweDsgfVxcbiAgLmVkcyBoMyB7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZm9udC1zaXplOiAxOHB4OyB9XFxuICAuZWRzIGg0IHtcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDUge1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG4gIC5lZHMgaDFbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAyOHB4OyB9XFxuICAuZWRzIGgyW2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMjJweDsgfVxcbiAgLmVkcyBoM1tjYXBzXSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3O1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5lZHMgaDRbY2Fwc10ge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBjb2xvcjogIzZkMjA3NztcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAuZWRzIGg1W2NhcHNdIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM2ZDIwNzc7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmVkcyBociB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOGQ4ZDg7XFxuICAgIGhlaWdodDogMXB4OyB9XFxuICAuZWRzIC5zci1vbmx5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyOiAwOyB9XFxuXFxuW2JhY2tncm91bmQ9J2dyYXknXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2OyB9XFxuXFxuLm5vLXNjcm9sbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuZWRzLWljb25bc3Bpbl0ge1xcbiAgYW5pbWF0aW9uOiBlZHMtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7IH1cXG5cXG5lZHMtaWNvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luOiAwIDZweCAwIDA7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207IH1cXG4gIGVkcy1pY29uIC5tYXRlcmlhbC1pY29ucyB7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcbiAgZWRzLWljb24gPiAqIHtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0OyB9XFxuXFxuZWRzLWljb24uczE4ID4gKiB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczI0ID4gKiB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczM2ID4gKiB7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczQ4ID4gKiB7XFxuICBmb250LXNpemU6IDQ4cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb24uczYwID4gKiB7XFxuICBmb250LXNpemU6IDYwcHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tOyB9XFxuXFxuZWRzLWljb25bYm9yZGVyXSB7XFxuICBwYWRkaW5nOiAwLjhyZW07XFxuICBib3JkZXI6IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4OyB9XFxuXFxuLmhlYWRlci1jb250YWluZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICBsaW5lLWhlaWdodDogMDsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbiB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgcGFkZGluZzogMTdweCAyM3B4O1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBjb2xvcjogIzQyNmRhOTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbjpob3ZlciB7XFxuICAgICAgICBjb2xvcjogIzFkNGY5MTsgfVxcbiAgICAuaGVhZGVyLWNvbnRhaW5lciAuaWNvbi1jb250YWluZXIgLmhvbWUtaWNvbi5zZWxlY3RlZCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gICAgICBjb2xvcjogIzMzMzMzMzsgfVxcbiAgLmhlYWRlci1jb250YWluZXIgLnRhYnMtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG5wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2NjY2M7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzgwcHg7XFxuICBoZWlnaHQ6IDUwcHg7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWI6bGFzdC1jaGlsZCB7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjY2NjY2M7IH1cXG4gIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogIzQyNmRhOTsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciBlZHMtaWNvbiB7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLmluZm8tY29udGFpbmVyIFtpY29uPSdwZXJzb24nXSB7XFxuICAgICAgcGFkZGluZzogMCAxMHB4IDAgMjBweDsgfVxcbiAgICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiIC5pbmZvLWNvbnRhaW5lciAucGVyc29uLW5hbWUge1xcbiAgICAgIG1pbi13aWR0aDogMTcycHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuNDsgfVxcbiAgcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYiAudGFiLWNvbnRyb2xzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAgIHBjYy1lZHMtc2Vjb25kYXJ5LWhlYWRlci10YWIgLnRhYi1jb250cm9scyAuY2xvc2UtYnV0dG9uIHtcXG4gICAgICBtYXJnaW46IDAgMTBweCAwIDVweDtcXG4gICAgICBwYWRkaW5nOiA4cHg7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIGNvbG9yOiAjNDI2ZGE5OyB9XFxuXFxucGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLXRhYlthY3RpdmVdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB9XFxuICBwY2MtZWRzLXNlY29uZGFyeS1oZWFkZXItdGFiW2FjdGl2ZV0gLmluZm8tY29udGFpbmVyIHtcXG4gICAgY29sb3I6ICMzMzMzMzM7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qXFxyXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcclxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXHJcXG4gKi9cXG4vKlxcclxcbiAqIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBjb21wb25lbnRzIGdsb2JhbGx5IGFuZCBhcmUgdGh1cyBkZXNpZ25hdGVkIHdpdGggYW4gXFxcImVkcy1cXFwiIHByZWZpeC5cXHJcXG4gKiBDb21wb25lbnRzIG1heSBpbXBsZW1lbnQgdGhlc2UgYW5kIHBhc3MtdGhyb3VnaCB0byBhIGxvY2FsIHZhcmlhYmxlIG5hbWUuXFxyXFxuICovXFxuQGtleWZyYW1lcyBcXFwiZWRzLXNwaW5cXFwiIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cXG5cXG5lZHMtaWNvbltzcGluXSB7XFxuICBhbmltYXRpb246IGVkcy1zcGluIDJzIGluZmluaXRlIGxpbmVhcjsgfVxcblxcbmVkcy1pY29uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAwICFpbXBvcnRhbnQ7XFxuICBtYXJnaW46IDAgNnB4IDAgMDtcXG4gIHZlcnRpY2FsLWFsaWduOiB0ZXh0LWJvdHRvbTsgfVxcbiAgZWRzLWljb24gLm1hdGVyaWFsLWljb25zIHtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0OyB9XFxuICBlZHMtaWNvbiA+ICoge1xcbiAgICBmb250LXNpemU6IGluaGVyaXQ7IH1cXG5cXG5lZHMtaWNvbi5zMTYgPiAqIHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbi5zMTggPiAqIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbi5zMjQgPiAqIHtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbi5zMzYgPiAqIHtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbi5zNDggPiAqIHtcXG4gIGZvbnQtc2l6ZTogNDhweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbi5zNjAgPiAqIHtcXG4gIGZvbnQtc2l6ZTogNjBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG5lZHMtaWNvbltib3JkZXJdIHtcXG4gIHBhZGRpbmc6IDAuOHJlbTtcXG4gIGJvcmRlcjogNHB4IHNvbGlkICNkOGQ4ZDg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImVkcy10YWcge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNHB4IDEwcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxICFpbXBvcnRhbnQ7IH1cXG4gIGVkcy10YWc6bm90KFttb3RpZl0pIHtcXG4gICAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gICAgY29sb3I6ICMzMzMzMzM7IH1cXG5cXG5lZHMtdGFnW21vdGlmPVxcXCJkZWZhdWx0XFxcIl0ge1xcbiAgYmFja2dyb3VuZDogI2U2ZTZlNjtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nZXJyb3InXSB7XFxuICBiYWNrZ3JvdW5kOiAjZmZkY2UyO1xcbiAgY29sb3I6ICNlNDAwMmI7IH1cXG5cXG5lZHMtdGFnW21vdGlmPSd3YXJuaW5nJ10ge1xcbiAgYmFja2dyb3VuZDogI2ZjZWViYTtcXG4gIGNvbG9yOiAjYjM1OTAwOyB9XFxuXFxuZWRzLXRhZ1ttb3RpZj0nc3VjY2VzcyddIHtcXG4gIGJhY2tncm91bmQ6ICNjZGY0ZDI7XFxuICBjb2xvcjogIzAwN0EzQjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypcXHJcXG4gKiBUaGVzZSB2YXJpYWJsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgY29tcG9uZW50cyBnbG9iYWxseSBhbmQgYXJlIHRodXMgZGVzaWduYXRlZCB3aXRoIGFuIFxcXCJlZHMtXFxcIiBwcmVmaXguXFxyXFxuICogQ29tcG9uZW50cyBtYXkgaW1wbGVtZW50IHRoZXNlIGFuZCBwYXNzLXRocm91Z2ggdG8gYSBsb2NhbCB2YXJpYWJsZSBuYW1lLlxcclxcbiAqL1xcbi8qXFxyXFxuICogVGhlc2UgdmFyaWFibGVzIGFyZSBhdmFpbGFibGUgdG8gYWxsIGNvbXBvbmVudHMgZ2xvYmFsbHkgYW5kIGFyZSB0aHVzIGRlc2lnbmF0ZWQgd2l0aCBhbiBcXFwiZWRzLVxcXCIgcHJlZml4LlxcclxcbiAqIENvbXBvbmVudHMgbWF5IGltcGxlbWVudCB0aGVzZSBhbmQgcGFzcy10aHJvdWdoIHRvIGEgbG9jYWwgdmFyaWFibGUgbmFtZS5cXHJcXG4gKi9cXG5wY2MtZWRzLXRpbWVsaW5lLWl0ZW0ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjMzMzMzMzOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLmZsZXgtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLWxlZnQge1xcbiAgICBmbGV4OiAxOyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24taWNvbiB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2Q4ZDhkODtcXG4gICAgbWFyZ2luLWxlZnQ6IDUzcHg7XFxuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIC5zZWN0aW9uLWljb24gLmljb24tY2lyY2xlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYxNjg1O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICBoZWlnaHQ6IDQwcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDQycHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgICAgIHdpZHRoOiA0MHB4OyB9XFxuICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24tbWFpbiB7XFxuICAgIGZsZXg6IDU7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcbiAgICBwYWRkaW5nLXRvcDogMTBweDsgfVxcbiAgICBwY2MtZWRzLXRpbWVsaW5lLWl0ZW0gLnNlY3Rpb24tbWFpbiAucGxhY2Vob2xkZXItY2VudGVyIHtcXG4gICAgICBmbGV4OiAyOyB9XFxuICAgIHBjYy1lZHMtdGltZWxpbmUtaXRlbSAuc2VjdGlvbi1tYWluIC5wbGFjZWhvbGRlci1yaWdodCB7XFxuICAgICAgZmxleDogMTsgfVxcbiAgcGNjLWVkcy10aW1lbGluZS1pdGVtIFtzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXg6IDU7IH1cXG4gICAgcGNjLWVkcy10aW1lbGluZS1pdGVtIFtzbG90PVxcXCJzbG90LWhlYWRlci1jZW50ZXJcXFwiXSBbc2xvdD1cXFwic2xvdC1oZWFkZXItbGVmdFxcXCJdIHtcXG4gICAgICBmbGV4OiA0OyB9XFxuICAgIHBjYy1lZHMtdGltZWxpbmUtaXRlbSBbc2xvdD1cXFwic2xvdC1oZWFkZXItY2VudGVyXFxcIl0gW3Nsb3Q9XFxcInNsb3QtaGVhZGVyLXJpZ2h0XFxcIl0ge1xcbiAgICAgIGZsZXg6IDE7XFxuICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuXFxucGNjLWVkcy10aW1lbGluZS1pdGVtOmxhc3QtY2hpbGQgLnNlY3Rpb24taWNvbiB7XFxuICBib3JkZXItbGVmdDogMDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJ0biB7XFxuICB3aWR0aDogMTIwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI2ZGE5O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzAwNDU5MDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4uYm9yLWxlZnQtLW5vbmUge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4ubWFyLXJpZ2h0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7IH1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBjb250ZW50OiBub25lOyB9XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwOyB9XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7IH1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogMTYwMHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuLmRpcy1mbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uaGVhZGVyX19sb2dvIHtcXG4gIHdpZHRoOiAxMDlweDtcXG4gIGhlaWdodDogMzZweDtcXG4gIG1hcmdpbjogMCAxNXB4O1xcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXG4gIGJvcmRlci1yaWdodDogc29saWQgMXB4ICNjY2NjY2M7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5oZWFkZXJfX2xvZ29saW5rIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdGV4dC1pbmRlbnQ6IC05OTk5OWVtO1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4uaGVhZGVyX19sb2dvZGVzYyB7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzMzMzMzMztcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmhlYWRlcl9fbmF2IHtcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5oZWFkZXJfX2xpc3Rjb250IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4uaGVhZGVyX19saXN0IHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjZGNkY2RjO1xcbiAgcGFkZGluZzogMTVweDsgfVxcblxcbi5oZWFkZXJfX2xpbmsge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjNDI2ZGE5O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmhlYWRlcl9fc2VhcmNoaWNvbiB7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMThweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7IH1cXG5cXG4uaGVhZGVyX19uZXh0aWNvbiB7XFxuICB3aWR0aDogMTZweDtcXG4gIGhlaWdodDogMTZweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7IH1cXG5cXG4uaGVhZGVyX19jYXNlbGlzdGljb24ge1xcbiAgd2lkdGg6IDE2cHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogNXB4OyB9XFxuXFxuLmhlYWRlcl9fbWVudWljb24ge1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIycHg7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5oZWFkZXJfX2hlbHBpY29uIHtcXG4gIHdpZHRoOiAyMnB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG5cXG4uaGVhZGVyX19tZXNzYWdlaWNvbiB7XFxuICB3aWR0aDogMjJweDtcXG4gIGhlaWdodDogMThweDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWFyZ2luLXRvcDogM3B4OyB9XFxuXFxuLmhlYWRlcl9fbm90aWZpY2F0aW9uaWNvbiB7XFxuICB3aWR0aDogMjFweDtcXG4gIGhlaWdodDogMjJweDtcXG4gIGZsb2F0OiBsZWZ0OyB9XFxuXFxuLmhlYWRlcl9fY291bnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjZTIwMDAwO1xcbiAgd2lkdGg6IDIxcHg7XFxuICBoZWlnaHQ6IDE3cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB0b3A6IC03cHg7XFxuICByaWdodDogLTdweDtcXG4gIHBhZGRpbmctdG9wOiAzcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmhlYWRlci0tdXNlcnByb2ZpbGUge1xcbiAgYm9yZGVyOiBzb2xpZCAycHggIzQyNmRhOTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBhZGRpbmc6IDZweCA1cHg7XFxuICBmb250LXNpemU6IDEycHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImVkcy1hY2NvcmRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cXG4gIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIHAge1xcbiAgICAgIHRyYW5zaXRpb246IHBhZGRpbmcgMTAwbXMgZWFzZSAwbXMsIG9wYWNpdHkgNzVtcyBlYXNlIDI1bXM7XFxuICAgICAgcGFkZGluZzogMCAyMHB4O1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgbWF4LWhlaWdodDogMDtcXG4gICAgICBvcGFjaXR5OiAwOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE1MG1zIGVhc2UgMG1zOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgaGVpZ2h0OiA0MHB4O1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbDpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0VERjRGQTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbDphY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWNhcmV0IHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHJpZ2h0OiAyMHB4O1xcbiAgICAgICAgdG9wOiAxNnB4O1xcbiAgICAgICAgd2lkdGg6IDEycHg7XFxuICAgICAgICBoZWlnaHQ6IDhweDtcXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlNVEp3ZUNJZ2FHVnBaMmgwUFNJM2NIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1pQTNJaUIyWlhKemFXOXVQU0l4TGpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpUGdvZ0lDQWdQQ0V0TFNCSFpXNWxjbUYwYjNJNklGTnJaWFJqYUNBME9DNHlJQ2cwTnpNeU55a2dMU0JvZEhSd09pOHZkM2QzTG1KdmFHVnRhV0Z1WTI5a2FXNW5MbU52YlM5emEyVjBZMmdnTFMwK0NpQWdJQ0E4ZEdsMGJHVStSM0p2ZFhBZ01qd3ZkR2wwYkdVK0NpQWdJQ0E4WkdWell6NURjbVZoZEdWa0lIZHBkR2dnVTJ0bGRHTm9Mand2WkdWell6NEtJQ0FnSUR4a1pXWnpQand2WkdWbWN6NEtJQ0FnSUR4bklHbGtQU0pRWVdkbExUSXpJaUJ6ZEhKdmEyVTlJbTV2Ym1VaUlITjBjbTlyWlMxM2FXUjBhRDBpTVNJZ1ptbHNiRDBpYm05dVpTSWdabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJajRLSUNBZ0lDQWdJQ0E4WnlCcFpEMGlSM0p2ZFhBdE1pSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTmk0d01EQXdNREFzSURFdU1EQXdNREF3S1NCeWIzUmhkR1VvTFRRMUxqQXdNREF3TUNrZ2RISmhibk5zWVhSbEtDMDJMakF3TURBd01Dd2dMVEV1TURBd01EQXdLU0IwY21GdWMyeGhkR1VvTWk0d01EQXdNREFzSUMwekxqQXdNREF3TUNraUlHWnBiR3c5SWlNd1JUWkZRamNpUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVZqZENCcFpEMGlVbVZqZEdGdVoyeGxMVElpSUhnOUlqQWlJSGs5SWpBaUlIZHBaSFJvUFNJeUlpQm9aV2xuYUhROUlqZ2lJSEo0UFNJeElqNDhMM0psWTNRK0NpQWdJQ0FnSUNBZ0lDQWdJRHh5WldOMElHbGtQU0pTWldOMFlXNW5iR1V0TWkxRGIzQjVJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnMExqQXdNREF3TUN3Z055NHdNREF3TURBcElISnZkR0YwWlNnNU1DNHdNREF3TURBcElIUnlZVzV6YkdGMFpTZ3ROQzR3TURBd01EQXNJQzAzTGpBd01EQXdNQ2tnSWlCNFBTSXpJaUI1UFNJeklpQjNhV1IwYUQwaU1pSWdhR1ZwWjJoMFBTSTRJaUJ5ZUQwaU1TSStQQzl5WldOMFBnb2dJQ0FnSUNBZ0lEd3ZaejRLSUNBZ0lEd3ZaejRLUEM5emRtYytcXFwiKTsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWw6Zmlyc3QtY2hpbGQge1xcbiAgICAgIGJvcmRlcjogMDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWwgLnRhYmxlIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmOyB9XFxuICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0ge1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gcCB7XFxuICAgICAgdHJhbnNpdGlvbjogcGFkZGluZyAxNTBtcyBlYXNlIDBtcztcXG4gICAgICBtYXgtaGVpZ2h0OiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDI0cHggMjBweDtcXG4gICAgICBvcGFjaXR5OiAxOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgICAgbWFyZ2luOiAwIDIwcHg7XFxuICAgICAgcGFkZGluZzogMTBweCAwO1xcbiAgICAgIHdpZHRoOiBhdXRvOyB9XFxuICAgICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tc3VibGFiZWwge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gcCB7XFxuICAgIHRyYW5zaXRpb246IHBhZGRpbmcgMTUwbXMgZWFzZSAwbXM7XFxuICAgIG1heC1oZWlnaHQ6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDI0cHggMjBweDtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gICAgd2lkdGg6IGF1dG87IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgZWRzLWFjY29yZGlvbiBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIGVkcy1hY2NvcmRpb24gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLXN1YmxhYmVsIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICBlZHMtYWNjb3JkaW9uIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcblxcbmVkcy1hY2NvcmRpb25bd2lkZV0ge1xcbiAgYm9yZGVyLXJhZGl1czogMDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsIHtcXG4gICAgcGFkZGluZzogMTBweCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMikge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICBtYXJnaW4tbGVmdDogM3B4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tY2FyZXQge1xcbiAgICB0b3A6IDE2cHg7XFxuICAgIGxlZnQ6IDE5cHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbCBwIHtcXG4gICAgcGFkZGluZzogMCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgxKSB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAgIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGVdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlPVxcXCJ0cnVlXFxcIl0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHBhZGRpbmc6IDExcHggMDtcXG4gICAgbWFyZ2luOiAwIDUwcHg7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZV0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSBwIHtcXG4gICAgcGFkZGluZzogMjRweCA1MHB4IDQ4cHggNTBweDsgfVxcblxcbmVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIHtcXG4gIGJvcmRlci1yYWRpdXM6IDA7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dDpudGgtY2hpbGQoMSkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjNmQyMDc3OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgbWFyZ2luLWxlZnQ6IDNweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCAuZWRzLWFjY29yZGlvbi1jYXJldCB7XFxuICAgIHRvcDogMTZweDtcXG4gICAgbGVmdDogMTlweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbCBwIHtcXG4gICAgcGFkZGluZzogMCA1MHB4OyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZV0gLmVkcy1hY2NvcmRpb24tbGFiZWwge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHBhZGRpbmc6IDExcHggMDtcXG4gICAgbWFyZ2luOiAwIDUwcHg7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmVdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDIpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIGVkcy1hY2NvcmRpb25bd2lkZT1cXFwidHJ1ZVxcXCJdIGVkcy1hY2NvcmRpb24tcGFuZWxbYWN0aXZlXSBwIHtcXG4gICAgcGFkZGluZzogMjRweCA1MHB4IDQ4cHggNTBweDsgfVxcbiAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgcGFkZGluZzogMTFweCAwO1xcbiAgICBtYXJnaW46IDAgNTBweDsgfVxcbiAgICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIC5lZHMtYWNjb3JkaW9uLWxhYmVsIC5lZHMtYWNjb3JkaW9uLWxhYmVsLXRleHQ6bnRoLWNoaWxkKDEpIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gICAgZWRzLWFjY29yZGlvblt3aWRlPVxcXCJ0cnVlXFxcIl0gZWRzLWFjY29yZGlvbi1wYW5lbFthY3RpdmU9XFxcInRydWVcXFwiXSAuZWRzLWFjY29yZGlvbi1sYWJlbCAuZWRzLWFjY29yZGlvbi1sYWJlbC10ZXh0Om50aC1jaGlsZCgyKSB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICBlZHMtYWNjb3JkaW9uW3dpZGU9XFxcInRydWVcXFwiXSBlZHMtYWNjb3JkaW9uLXBhbmVsW2FjdGl2ZT1cXFwidHJ1ZVxcXCJdIHAge1xcbiAgICBwYWRkaW5nOiAyNHB4IDUwcHggNDhweCA1MHB4OyB9XFxuXFxuLmVkcy1ncmV5ZWQge1xcbiAgY29sb3I6ICNjY2M7IH1cXG5cXG4uYWNjdC1jb250YWluZXIgLmVkcy1hY2NvcmRpb24tbGFiZWwgLmVkcy1hY2NvcmRpb24tbGFiZWwtdGV4dCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5idG4ge1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgcGFkZGluZzogMTBweCAwO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNmRhOTtcXG4gIGJvcmRlcjogc29saWQgMXB4ICMwMDQ1OTA7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1NZWRpdW1cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmJvci1sZWZ0LS1ub25lIHtcXG4gIGJvcmRlci1sZWZ0OiBub25lOyB9XFxuXFxuLm1hci1yaWdodC0tbm9uZSB7XFxuICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxcblxcbmVkcy10YWJzIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuICBlZHMtdGFicyAudGFiLWxhYmVscyB7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGkge1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBwYWRkaW5nOiAwO1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgbGluZS1oZWlnaHQ6IDQ1cHg7IH1cXG4gICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSBhIHtcXG4gICAgICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgY29sb3I6ICMzMzMzMzM7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIGE6aG92ZXIge1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgI2Q4ZDhkODtcXG4gICAgICAgICAgY29sb3I6ICM0MjZkYTk7IH1cXG4gICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSBhW2FyaWEtc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSB7XFxuICAgICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgI2U2Mzg4ODtcXG4gICAgICAgIGNvbG9yOiAjMTYzYzZmOyB9XFxuICBlZHMtdGFicyBlZHMtdGFiIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMTVzIGxpbmVhcjsgfVxcbiAgICBlZHMtdGFicyBlZHMtdGFiOmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICAgICAgZGlzcGxheTogdGFibGU7IH1cXG4gICAgZWRzLXRhYnMgZWRzLXRhYjpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgICBkaXNwbGF5OiB0YWJsZTsgfVxcbiAgZWRzLXRhYnMgZWRzLXRhYlthY3RpdmVdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG5cXG5lZHMtdGFic1t2ZXJ0aWNhbF0ge1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgZWRzLXRhYnNbdmVydGljYWxdIC50YWItbGFiZWxzIHtcXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gICAgZmxleDogMCAwIDE4MHB4O1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICBib3JkZXItYm90dG9tOiBub25lOyB9XFxuICAgIGVkcy10YWJzW3ZlcnRpY2FsXSAudGFiLWxhYmVscyBsaSB7XFxuICAgICAgaGVpZ2h0OiA1MHB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICAgIGVkcy10YWJzW3ZlcnRpY2FsXSAudGFiLWxhYmVscyBsaTpsYXN0LWNoaWxkIHtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgICAgZWRzLXRhYnNbdmVydGljYWxdIC50YWItbGFiZWxzIGxpIGE6aG92ZXIge1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTZweDsgfVxcbiAgICAgIGVkcy10YWJzW3ZlcnRpY2FsXSAudGFiLWxhYmVscyBsaSBhW2FyaWEtc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSB7XFxuICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlNjM4ODg7XFxuICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxNnB4OyB9XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xcbiAgZWRzLXRhYnMge1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuICAgIGVkcy10YWJzIC50YWItbGFiZWxzIHtcXG4gICAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgICAgIGZsZXg6IDAgMCAxODBweDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH1cXG4gICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSB7XFxuICAgICAgICBoZWlnaHQ6IDUwcHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q4ZDhkODsgfVxcbiAgICAgICAgZWRzLXRhYnMgLnRhYi1sYWJlbHMgbGk6bGFzdC1jaGlsZCB7XFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDhkOGQ4OyB9XFxuICAgICAgICBlZHMtdGFicyAudGFiLWxhYmVscyBsaSBhOmhvdmVyIHtcXG4gICAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZDhkOGQ4O1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH1cXG4gICAgICAgIGVkcy10YWJzIC50YWItbGFiZWxzIGxpIGFbYXJpYS1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gICAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZTYzODg4O1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7IH0gfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmJ0biB7XFxuICB3aWR0aDogMTIwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI2ZGE5O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzAwNDU5MDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4uYm9yLWxlZnQtLW5vbmUge1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7IH1cXG5cXG4ubWFyLXJpZ2h0LS1ub25lIHtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OyB9XFxuXFxuLnNlYXJjaF9faW5uZXJjb250IHtcXG4gIHdpZHRoOiA3NyU7XFxuICBtYXJnaW46IDM1cHggYXV0byAwIGF1dG87IH1cXG5cXG4uc2VhcmNoX19oZWFkaW5nIHtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLVJlZ3VsYXJcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMzM7IH1cXG5cXG4uc2VhcmNoX19jYWxsc3RhdHMge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMTAwcHg7XFxuICBtYXJnaW46IDQwcHggMzVweCAzMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLnNlYXJjaF9fc3RhdGNvdW50IHtcXG4gIGZvbnQtc2l6ZTogNjRweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLU1lZGl1bVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgY29sb3I6ICM0ZTRlNGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uc2VhcmNoX19zdGF0ZGVzYyB7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogIzdhN2E3YTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc2VhcmNoX19wZXJjZW50YWdlIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvLUJvbGRcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGNvbG9yOiAjMzMzMzMzO1xcbiAgbGluZS1oZWlnaHQ6IDAuODM7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDEwcHg7XFxuICByaWdodDogMHB4OyB9XFxuXFxuLnNlYXJjaC0tY29sbGVjdGVkIHtcXG4gIG1hcmdpbjogNDBweCAxMHB4IDMwcHg7XFxuICB3aWR0aDogMTUwcHg7IH1cXG5cXG4uc2VhcmNoX19ieWNvbnQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgcGFkZGluZzogMjBweCAwO1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDsgfVxcblxcbi5zZWFyY2hfX2Zvcm0ge1xcbiAgd2lkdGg6IDcwJTtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLnNlYXJjaF9faW5wdXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gIGJvcmRlcjogc29saWQgMXB4ICM4ODg4ODg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90by1SZWd1bGFyXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogI2FhYWFhYTtcXG4gIHBhZGRpbmc6IDVweCAwcHggNXB4IDEwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMjQlOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsIGEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSwgZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLCBzbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLCBiLCB1LCBpLCBjZW50ZXIsIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIGZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTsgfVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxOyB9XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTsgfVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgY29udGVudDogbm9uZTsgfVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIG1heC13aWR0aDogMTY4MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uaGVhZGVyIHtcXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDJweCAjYmEyZjdkO1xcbiAgcGFkZGluZzogMTBweCAwIDAgMDtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uaGVhZGVyX19sb2dvbGluayB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9leHBlcmlhbl9fbG9nby5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmhlYWRlcl9fc2VhcmNoaWNvbiB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9zZWFyY2hfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5oZWFkZXJfX25leHRpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2xvYWRuZXh0X19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uaGVhZGVyX19jYXNlbGlzdGljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvY2FzZWxpc3RfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5oZWFkZXJfX21lbnVpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL21lbnVfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5oZWFkZXJfX2hlbHBpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL2hlbHBfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5oZWFkZXJfX21lc3NhZ2VpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL21lc3NhZ2VfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5oZWFkZXJfX25vdGlmaWNhdGlvbmljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvbm90aWZpY2F0aW9uX19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uc2VhcmNoIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2dvaWNvbiB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9uZXh0X19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX3Byb2ZpbGVpY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1hZ2VzL3Byb2ZpbGVfX2ljb24ucG5nXCIpKSArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTsgfVxcblxcbi5jYXNlbGlzdF9fdXNlcmljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvdXNlcl9faWNvbi5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlOyB9XFxuXFxuLmNhc2VsaXN0X19maWxlaWNvbiB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltYWdlcy9maWxlX19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2RpdmVydGljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvZGl2ZXJ0X19pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cXG4uY2FzZWxpc3RfX2ZvbGRlcmljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWFnZXMvdXNlcmZvbGRlcl9pY29uLnBuZ1wiKSkgKyBcIikgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cbiAgICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgICB9XG4gICAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAgIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gICAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLmVvdFwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci50dGZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmMlwiOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYXRlcmlhbC1pY29ucy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWF0ZXJpYWwtaWNvbnMuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcm9ib3RvLWZvbnRmYWNlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvYm90by1mb250ZmFjZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tQmxhY2sud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFjay53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1CbGFja0l0YWxpYy53b2ZmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJsYWNrSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGQud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUJvbGRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1Cb2xkSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLUxpZ2h0LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHQud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTGlnaHRJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1MaWdodEl0YWxpYy53b2ZmMlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1NZWRpdW0ud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9Sb2JvdG8tTWVkaXVtSXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXIud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFyLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVJlZ3VsYXJJdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1SZWd1bGFySXRhbGljLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW4ud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvUm9ib3RvLVRoaW5JdGFsaWMud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1JvYm90by1UaGluSXRhbGljLndvZmYyXCI7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9zcmMvYXNzZXRzL2ltYWdlcy9jYXNlbGlzdF9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvZGl2ZXJ0X19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9zcmMvYXNzZXRzL2ltYWdlcy9leHBlcmlhbl9fbG9nby5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvZmlsZV9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvaGVscF9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvbG9hZG5leHRfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL3NyYy9hc3NldHMvaW1hZ2VzL21lbnVfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL3NyYy9hc3NldHMvaW1hZ2VzL21lc3NhZ2VfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL3NyYy9hc3NldHMvaW1hZ2VzL25leHRfX2ljb24ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL3NyYy9hc3NldHMvaW1hZ2VzL25vdGlmaWNhdGlvbl9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvcHJvZmlsZV9faWNvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvc3JjL2Fzc2V0cy9pbWFnZXMvc2VhcmNoX19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyX19pY29uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9zcmMvYXNzZXRzL2ltYWdlcy91c2VyZm9sZGVyX2ljb24ucG5nXCI7IiwiaW1wb3J0ICdyb2JvdG8tZm9udGZhY2UnO1xyXG5pbXBvcnQgJ21hdGVyaWFsLWljb25zJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvc3R5bGUuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvaGVhZGVyLnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9zZWFyY2guc2Nzcyc7XHJcbmltcG9ydCAnLi4vc3R5bGVzL2Nhc2VMaXN0LnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzcyc7XHJcbmltcG9ydCAnLi4vc3R5bGVzL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9wY2MtYWNjb3JkaWFuLnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtY2FyZC5zY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLWRyb3Bkb3duLnNjc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9lZHMtaWNvbi5zY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLXRpbWVsaW5lLWl0ZW0uc2NzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvZWRzLXRhZy5zY3NzJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hY3Rpdml0aWVzLnNjc3MnXHJcblxyXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hY3Rpdml0aWVzLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYWN0aXZpdGllcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hY3Rpdml0aWVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hcHAuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9hcHAuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYXBwLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jYXNlTGlzdC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Nhc2VMaXN0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Nhc2VMaXN0LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kZW1vLXBjYy1vdmVydmlldy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RlbW8tcGNjLW92ZXJ2aWV3LnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtY2FyZC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1jYXJkLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1jYXJkLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZHJvcGRvd24uc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZHJvcGRvd24uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLWRyb3Bkb3duLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtZ2xvYmFsLXN0eWxlcy5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1nbG9iYWwtc3R5bGVzLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtaWNvbi5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1pY29uLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy1pY29uLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGFnLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZWRzLXRhZy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGFnLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9lZHMtdGltZWxpbmUtaXRlbS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy10aW1lbGluZS1pdGVtLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Vkcy10aW1lbGluZS1pdGVtLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaGVhZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtYWNjb3JkaWFuLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWFjY29yZGlhbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtYWNjb3JkaWFuLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wY2MtZWRzLXNlY29uZGFyeS1oZWFkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGNjLWVkcy1zZWNvbmRhcnktaGVhZGVyLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zZWFyY2guc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zZWFyY2guc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9