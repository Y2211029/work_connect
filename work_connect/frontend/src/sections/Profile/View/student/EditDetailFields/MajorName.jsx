import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";
import InsertTag from 'src/components/tag/InsertTag';

const MajorNameDropdown = ({ MajorNameData }) => {
    const {InsertTagFunction} = InsertTag();
    const [selectedMajorName, setSelectedMajorName] = useState(MajorNameData);

    const { getSessionData, updateSessionData } = useSessionStorage();

    const [options, setOptions] = useState([]);

    const { GetTagAllListFunction } = GetTagAllList();

    useEffect(() => {
        let optionArrayPromise = GetTagAllListFunction("student_major_name");
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
                setSelectedMajorName({
                    value: SessionData.MajorName,
                    label: SessionData.MajorName,
                });
            } else if (
                (SessionData.MajorNameEditing && SessionData.MajorName && MajorNameData) ||
                (!SessionData.MajorNameEditing && MajorNameData)
            ) {
                // DBから最新のデータを取得
                setSelectedMajorName({
                    value: MajorNameData,
                    label: MajorNameData,
                });
            }
        }
    }, [MajorNameData]);

    useEffect(() => {
        if (selectedMajorName) {
            updateSessionData("accountData", "MajorName", selectedMajorName.value);
        } else {
            updateSessionData("accountData", "MajorName", "");
        }
    }, [selectedMajorName]);

    const handleChange = (selectedOption, actionMeta) => {
        // newValueをセット
        setSelectedMajorName(selectedOption);
        // 編集中状態をオン(保存もしくはログアウトされるまで保持)
        updateSessionData("accountData", "MajorNameEditing", true);

        if (actionMeta && actionMeta.action === 'create-option') {
            const inputValue = actionMeta;
            const newOption = { value: inputValue.option.value, label: inputValue.option.label };
            setOptions([...options, newOption]);
            // 19は学生の専攻です。
            InsertTagFunction(inputValue.option.value, 19);
        }
      };

    return (
        <div>
            <CreatableSelect
        // プレフィックス＝接頭語
        // CreatableSelect内のInput要素のClass名の頭にMyPageEditItemsをつけるという意味
        classNamePrefix="MyPageEditItems"
                id="departmentDropdown"
                value={selectedMajorName}
                onChange={handleChange}
                options={options}
                placeholder="▼"
             
                isClearable
                styles={{
                    control: (base) => ({
                      ...base,
                      fontSize: '20px', // テキストサイズを調整
                    }),
                    placeholder: (base) => ({
                      ...base,
                      fontSize: '20px', // プレースホルダーのサイズを調整
                    }),
                    menu: (base) => ({
                      ...base,
                      fontSize: '20px', // ドロップダウンメニューの文字サイズ
                    }),
                  }}
            />
        </div>
    );
};

MajorNameDropdown.propTypes = {
    MajorNameData: PropTypes.string,
};

export default MajorNameDropdown;
