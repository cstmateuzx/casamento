
Access to fetch at 'https://script.google.com/macros/s/AKfycbz0QNdJhrZLeFS-z77g1OYThGqK3gQ4X4AEGwZBsA0n6dWLImQShcAasQEu0q_IYdJZ/exec' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
sheetsApi.ts:27  POST https://script.google.com/macros/s/AKfycbz0QNdJhrZLeFS-z77g1OYThGqK3gQ4X4AEGwZBsA0n6dWLImQShcAasQEu0q_IYdJZ/exec net::ERR_FAILED 401 (Unauthorized)
salvarConfirmacao @ sheetsApi.ts:27
(anônimo) @ InviteForm.tsx:51
(anônimo) @ react-dom.development.js:20565
invokeGuardedCallbackImpl @ react-dom.development.js:20614
invokeGuardedCallback @ react-dom.development.js:20689
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:20703
executeDispatch @ react-dom.development.js:32128
processDispatchQueueItemsInOrder @ react-dom.development.js:32160
processDispatchQueue @ react-dom.development.js:32173
dispatchEventsForPlugins @ react-dom.development.js:32184
(anônimo) @ react-dom.development.js:32374
batchedUpdates$1 @ react-dom.development.js:24953
batchedUpdates @ react-dom.development.js:28844
dispatchEventForPluginEventSystem @ react-dom.development.js:32373
dispatchEvent @ react-dom.development.js:30141
dispatchDiscreteEvent @ react-dom.development.js:30112
app-index.tsx:25 Erro ao enviar para Google Sheets: TypeError: Failed to fetch
    at salvarConfirmacao (sheetsApi.ts:27:30)
    at handleSubmit (InviteForm.tsx:51:46)

    