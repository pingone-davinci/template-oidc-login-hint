const sdk = require('@skinternal/skconnectorsdk');
const { serr, logger } = require('@skinternal/skconnectorsdk');
const { get } = require('lodash');
const connectorManifest = require('./manifest/manifest');

const redisList = 'connectorOIDC';


/**
 * Performs the necessary processing to initialize the connector
 *
 */
const initialize = async () => {
  try {
    // Update Manifest
    if (get(process, 'argv[2]', null) === 'mode=update-manifest') {
      await sdk.manifestDeploy(connectorManifest);
      return;
    }
    // The real thing of note here: registers the connector with the SDK and subscribes to REDIS changes
    const response = await sdk.initalize(redisList);
    logger.info('Started connector-oidc:', response);
  } catch (err) {
    logger.error('Error starting connector-oidc');
    logger.error(err);
  }
};

/**
 * Bootstrap this service.
 */
initialize()
module.exports={initialize}
