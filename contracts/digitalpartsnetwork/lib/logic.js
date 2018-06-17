/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
/**
 * Remove test assets and participants used for running a demo.
 * @param {net.biz.digitalpartsnetwork.undoSetup} undoSetup - the undoSetup transaction
 * @transaction
 */
function undoSetup(undoSetup) {
    var NS = 'net.biz.digitalpartsnetwork';
 
      return getAssetRegistry(NS + '.Vehicle')
      .then(function(vehicleRegistry) {
            // remove the vehicles
            return vehicleRegistry.getAll().then(function (vehicles) {
              if (vehicles.length >= 1 ) {
              vehicleRegistry.removeAll(vehicles);
            }
            })
          })
      .then(function() {
                return getAssetRegistry(NS + '.ComponentAssembly');
              })
      .then(function(componentAssemblyRegistry) {
            // remove the component assemblies
            return componentAssemblyRegistry.getAll().then(function (componentAssemblies) {
              if (componentAssemblies.length >= 1 ) {
              componentAssemblyRegistry.removeAll(componentAssemblies);
            }
            })
          })
      .then(function() {
              return getAssetRegistry(NS + '.ComponentPart');
            })
      .then(function(componentPartRegistry) {
                // remove the component parts
            return componentPartRegistry.getAll().then(function (componentParts) {
              if (componentParts.length >= 1 ) {
                  componentPartRegistry.removeAll(componentParts);
                }
              })
          })
      .then(function() {
                return getParticipantRegistry(NS + '.Owner')
            })
      .then(function (ownerRegistry) {
        return ownerRegistry.getAll().then(function (owners) {
          // remove the owners
          if (owners.length >= 1 ) {
          ownerRegistry.removeAll(owners);
        }
          })
        })
      .then(function() {
          return getParticipantRegistry(NS + '.Manufacturer');
        })
      .then(function(manufacturerRegistry) {
          // remove the manufacturers
          return manufacturerRegistry.getAll().then(function (manufacturers) {
            if (manufacturers.length >= 1 ) {
            manufacturerRegistry.removeAll(manufacturers);
          }
          })
        })
      .then(function() {
          return getParticipantRegistry(NS + '.Supplier');
        })
      .then(function(supplierRegistry) {
          // remove the suppliers
          return supplierRegistry.getAll().then(function (suppliers) {
            if (suppliers.length >= 1 ) {
            supplierRegistry.removeAll(suppliers);
          }
          })
        })

      .catch(function (error) {
        console.log(error.message);
      });
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {net.biz.digitalpartsnetwork.setupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function setupDemo(setupDemo) {

    var factory = getFactory();
    var NS = 'net.biz.digitalpartsnetwork';
    var vehicles = [];
    var Assemblies = [];
    var componentParts = [];
    var owners = [];
    var suppliers = [];
    var manufacturers = [];

 
    // create the owner
    var owner = factory.newResource(NS, 'Owner', 'DL1234567890');
    owner.firstName = 'Dennis';
    owner.lastName = 'Miller';
    owner.address1 = '362 Hominy Ct';
    owner.city = 'Terre Haute';
    owner.state = 'Indiana';
    owner.zip = '47803';
    owner.phone = '8122221234';
    owners.push(owner);

    // create the manufacturer
    var manufacturer = factory.newResource(NS, 'Manufacturer', 'MFG1234567890');
    manufacturer.manufacturerName = 'Future Automotive Inc.';
    manufacturer.address1 = '1000 Industrial Blvd.';
    manufacturer.city = 'Detroit';
    manufacturer.state = 'Michigan';
    manufacturer.zip = '89812';
    manufacturer.phone = '6471231212';
    manufacturers.push(manufacturer);
  
    // create the vehicle
    var vehicle = factory.newResource(NS, 'Vehicle', 'VIN1234567890');
    vehicle.owner = factory.newRelationship(NS, 'Owner', 'DL1234567890');
    vehicle.manufacturer = factory.newRelationship(NS, 'Manufacturer', 'MFG1234567890');
    vehicle.make = 'Future';
    vehicle.model = 'Special Edition';
    vehicle.year = '2017';
    vehicle.components = [];
    vehicle.inWarranty = true;
    vehicles.push(vehicle);
   
    // create the supplier
    var supplier = factory.newResource(NS, 'Supplier', 'SUP1234567890');
    supplier.supplierName = 'Future Automotive Supply Inc.';
    supplier.address1 = '100 Supplier Way';
    supplier.city = 'Dallas';
    supplier.state = 'Texas';
    supplier.zip = '75100';
    supplier.phone = '3471234567';
    suppliers.push(supplier);
  
    

    // create the component parts
    var componentPart = factory.newResource(NS, 'ComponentPart', 'PTNO1234567890');
    componentPart.description = 'Wiring harness';
    componentPart.supplier = factory.newRelationship(NS, 'Supplier', 'SUP1234567890');
    componentPart.quantity = 20;
    componentPart.defective = false;
    componentParts.push(componentPart);
  
    var componentPart2 = factory.newResource(NS, 'ComponentPart', 'PTNO0987654321');
    componentPart2.description = 'Gold clamp';
    componentPart2.supplier = factory.newRelationship(NS, 'Supplier', 'SUP1234567890');
    componentPart2.quantity = 40;
    componentPart2.defective = false;
    componentParts.push(componentPart2);
  
    // create the component assembly
    var componentAssembly = factory.newResource(NS, 'ComponentAssembly', 'IGN1234567890');
    componentAssembly.description = 'Ignition assembly';
    componentAssembly.manufacturer = factory.newRelationship(NS, 'Manufacturer', 'MFG1234567890');
    componentAssembly.parts = [];
    componentAssembly.quantity = 1;
    componentAssembly.defective = false;
    Assemblies.push(componentAssembly);
      
    
    return getParticipantRegistry(NS + '.Owner')
      .then(function (ownerRegistry) {
            // add the owners
            return ownerRegistry.addAll(owners);
        })
      .then(function() {
          return getParticipantRegistry(NS + '.Manufacturer');
        })
      .then(function(manufacturerRegistry) {
          // add the manufacturers
          return manufacturerRegistry.addAll(manufacturers);
        })
      .then(function() {
            return getParticipantRegistry(NS + '.Supplier');
        })
      .then(function(supplierRegistry) {
            // add the suppliers
            return supplierRegistry.addAll(suppliers);
        })
      .then(function() {
               return getAssetRegistry(NS + '.ComponentPart');
           })
       .then(function(componentPartRegistry) {
               // add the component parts
             return componentPartRegistry.addAll(componentParts);
          })
      .then(function() {
            return getAssetRegistry(NS + '.Vehicle');
        })
      .then(function(vehicleRegistry) {
            // add the vehicles
            return vehicleRegistry.addAll(vehicles);
        })
      .then(function() {
            return getAssetRegistry(NS + '.ComponentAssembly');
           })
       .then(function(AssemblyRegistry) {
               // add the component assemblies
             return AssemblyRegistry.addAll(Assemblies);
          })
      .catch(function (error) {
          console.log(error.message);
        });
}

/**
 * Add component assembly to vehicle
 * @param {net.biz.digitalpartsnetwork.addVehicleAssembly} assembly - the assembly
 * @transaction
 */
function addVehicleAssembly(assembly) {
    var vehicle = assembly.vehicle;
    var component = assembly.component;
    
    if (vehicle.components == null) {
        vehicle.components = [];
    }
    vehicle.components.push(component);
    var factory = getFactory();
    var vehicleAddAssemblyEvent = factory.newEvent('net.biz.digitalpartsnetwork', 'vehicleAddAssemblyEvent');
    vehicleAddAssemblyEvent.eventMessage = "Added assembly to vehicle";
    vehicleAddAssemblyEvent.vehicle = vehicle;
    vehicleAddAssemblyEvent.component = component;
    emit(vehicleAddAssemblyEvent);       
    getAssetRegistry('net.biz.digitalpartsnetwork.Vehicle').then(function(result) {
            return result.update(assembly.vehicle);
        }
    );
  
}

/**
 * Add part number to component assembly
 * @param {net.biz.digitalpartsnetwork.addAssemblyPart} assemblyPart - the part
 * @transaction
 */
function addAssemblyPart(assemblyPart) {
    var part = assemblyPart.partNo;
    var component = assemblyPart.component;
    
    if (component.parts == null) {
        component.parts = [];
    }
    component.parts.push(part);
    var factory = getFactory();
    var componentAddPartEvent = factory.newEvent('net.biz.digitalpartsnetwork', 'componentAddPartEvent');
    componentAddPartEvent.eventMessage = "Added part number to component assembly";
    componentAddPartEvent.partNo = part;
    componentAddPartEvent.component = component;
    emit(componentAddPartEvent);

    getAssetRegistry('net.biz.digitalpartsnetwork.ComponentAssembly').then(function(result) {
        return result.update(assemblyPart.component);
        }
    );
  
}