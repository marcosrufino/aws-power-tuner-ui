#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PowerTunerWebsiteStack } from '../lib/website-stack';
import { PowerTunerStack } from '../lib/power-tuner-stack';
import { PowerTunerLambdaStack } from '../lib/lambda-stack';
import { PowerTunerOnlyStack } from '../lib/power-tuner-only-stack';

const app = new cdk.App();

// First deploy the Power Tuner itself
const powerTunerOnlyStack = new PowerTunerOnlyStack(app, 'PowerTunerOnlyStack');

// Then deploy the API Gateway that uses it
const powerTunerInfraStack = new PowerTunerStack(app, 'PowerTunerInfraStack', {
  stateMachineArn: powerTunerOnlyStack.stateMachineArn
});

const powerTunerWebsiteStack = new PowerTunerWebsiteStack(app, 'PowerTunerWebsiteStack');
// Test lambda for tuning
const powerTunerLambdaStack = new PowerTunerLambdaStack(app, 'PowerTunerLambdaStack');

// Add dependency
powerTunerInfraStack.addDependency(powerTunerOnlyStack);
