import mongoose from "mongoose";
import { data } from "../assets/data";
import { District, DistrictModel, State, StateModel } from "../models/state";

export const transformedData: State[] = Object.entries(data).reduce(
  (result, [districtName, districtInfo]) => {
    const stateName = districtInfo.State;
    const pincodes = districtInfo.PinCodes;

    const existingState = result.find(
      (stateData) => stateData.name === stateName
    );

    if (existingState) {
      const district: District = {
        name: districtName,
        geoCode: districtInfo.GeoCode || [0, 0], // Provide default values if GeoCode is undefined
        pinCodes: pincodes,
      };

      existingState.districts.push(district);
    } else {
      const newState: State = {
        name: stateName,
        districts: [
          {
            name: districtName,
            geoCode: districtInfo.GeoCode || [0, 0], // Provide default values if GeoCode is undefined
            pinCodes: pincodes,
          },
        ],
      };

      result.push(newState);
    }

    return result;
  },
  [] as State[]
);

export const saveStates = async () => {
    try {
      const savedStates = [];
      const savedDistricts = [];
  
      transformedData.sort((a, b) => a.name.localeCompare(b.name));
  
      for (const stateData of transformedData) {
        // Ensure the state name is provided and not empty
        if (stateData.name && stateData.name.trim() !== "") {
          const districtIds: mongoose.Types.ObjectId[] = [];
  
          // Ensure the districts array is present and not empty
          if (stateData.districts && stateData.districts.length > 0) {
            stateData.districts.sort((a, b) => a.name.localeCompare(b.name));
  
            for (const district of stateData.districts) {
              // Ensure the 'name' field is provided and not empty
              if (district.name && district.name.trim() !== "") {
                const newDistrict = new DistrictModel({
                  name: district.name,
                  geoCode: district.geoCode,
                  pinCodes: district.pinCodes,
                });
  
                try {
                  const savedDistrict = await newDistrict.save();
                  districtIds.push(savedDistrict._id);
                  savedDistricts.push(savedDistrict);
                } catch (districtSaveError) {
                  console.error(`Error saving district for state ${stateData.name}:`, districtSaveError);
                }
              } else {
                console.error(`Invalid district name for state ${stateData.name}`);
              }
            }
  
            const newState = new StateModel({
              name: stateData.name,
              districts: districtIds,
            });
  
            try {
              const savedState = await newState.save();
              savedStates.push(savedState);
            } catch (stateSaveError) {
              console.error(`Error saving state ${stateData.name}:`, stateSaveError);
            }
          } else {
            console.error(`No valid districts found for state ${stateData.name}`);
          }
        } else {
          console.error(`Invalid state name`);
        }
      }
  
      await Promise.all(savedDistricts);
      await Promise.all(savedStates);
  
      console.log("States data saved successfully.");
    } catch (error) {
      console.error("Error saving states data:", error);
    }
  };
  
