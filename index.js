import * as core from '@actions/core';
import { fileSync } from 'tmp';
import { writeSync } from 'fs';
import { Firestore } from '@google-cloud/firestore';

(async () => {
    const path = core.getInput('path', { required: true })
    const value = core.getInput('value', { required: true })
    const projectId = core.getInput('projectId', { required: true })
    const key = core.getInput('key', { required: true })
    const credentials = core.getInput('credentials', { required: true })

    core.debug("Setting up credentials")
    const credentialsFile = fileSync({ postfix: ".json" })
    writeSync(credentialsFile.fd, credentials)

    core.debug("Writing data")
    const db = new Firestore({ projectId, keyFilename: credentialsFile.name })
    const docRef = db.doc(path);
    await docRef.set({ [key]: value }, { merge: true })
})().catch(err => {
    core.setFailed(err.message)
});
