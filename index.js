const core = require('@actions/core');
const { fileSync } = require('tmp');
const { writeSync } = require('fs');
const { Firestore } = require('@google-cloud/firestore');

(async () => {
    const path = core.getInput('path', { required: true })
    const value = core.getInput('value', { required: true })
    const projectId = core.getInput('projectId', { required: true })
    const field = core.getInput('field', { required: true })
    const credentials = core.getInput('credentials', { required: true })

    core.debug("Setting up credentials")
    const credentialsFile = fileSync({ postfix: ".json" })
    writeSync(credentialsFile.fd, credentials)

    core.debug("Writing data")
    const db = new Firestore({ projectId, keyFilename: credentialsFile.name })
    const docRef = db.doc(path);
    await docRef.set({ [field]: value }, { merge: true })
})().catch(err => {
    core.setFailed(err.message)
});
