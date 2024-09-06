import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const MajorNameDropdown = ({ MajorNameData }) => {
    const [selectedFaculty, setSelectedFaculty] = useState(MajorNameData);

    const { getSessionData, updateSessionData } = useSessionStorage();

    const [options, setOptions] = useState([]);

    const { GetTagAllListFunction } = GetTagAllList();

    useEffect(() => {
        let optionArrayPromise = GetTagAllListFunction("major_name");
        optionArrayPromise.then((result) => {
            setOptions(result);
        });
    }, []);

    // valueの初期値をセット
    useEffect(() => {
        if (getSessionData("accountData") !== undefined) {
            const SessionData = getSessionData("accountData");
            if (SessionData.MajorNameEditing && SessionData.MajorName) {
                // セッションストレージから最新のデータを取得
                setSelectedFaculty({
                    value: SessionData.MajorName,
                    label: SessionData.MajorName,
                });
            } else if (
                (SessionData.MajorNameEditing && SessionData.MajorName && MajorNameData) ||
                (!SessionData.MajorNameEditing && MajorNameData)
            ) {
                // DBから最新のデータを取得
                setSelectedFaculty({
                    value: MajorNameData,
                    label: MajorNameData,
                });
            }
        }
    }, [MajorNameData]);

    useEffect(() => {
        if (selectedFaculty) {
            updateSessionData("accountData", "MajorName", selectedFaculty.value);
        }
    }, [selectedFaculty]);

    const handleChange = (selectedOption) => {
        setSelectedFaculty(selectedOption);
        // sessionStrageに値を保存
        if (selectedOption) {
            updateSessionData("accountData", "MajorName", selectedOption.value);
        } else {
            // なしの場合
            updateSessionData("accountData", "MajorName", "");
        }
        // 編集中状態をオン(保存もしくはログアウトされるまで保持)
        updateSessionData("accountData", "MajorNameEditing", true);
    };

    return (
        <div>
            <Select
                id="departmentDropdown"
                value={selectedFaculty}
                onChange={handleChange}
                options={options}
                placeholder="Select..."
                isClearable
            />
        </div>
    );
};

MajorNameDropdown.propTypes = {
    MajorNameData: PropTypes.string,
};

export default MajorNameDropdown;
