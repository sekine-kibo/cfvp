(async (PLUGIN_ID) => {
  'use strict';

  const resp = await kintone.plugin.app.getConfig(PLUGIN_ID);
  const settings = JSON.parse(resp.settings).reverse();

  let events = [
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.print.show',
  ];

  settings.forEach((setting) => {
    setting.conditions.forEach((condition) => {
      events = [
        ...events,
        `app.record.create.change.${condition.field.code}`,
        `app.record.edit.change.${condition.field.code}`,
      ];
    });
  });

  const hideFields = (fields) => {
    fields.forEach((field) => kintone.app.record.setFieldShown(field, false));
  };

  const showFields = (fields) => {
    fields.forEach((field) => kintone.app.record.setFieldShown(field, true));
  };

  kintone.events.on(events, (event) => {
    settings.forEach((setting) => {
      const { settingOperator, hiddenFields, conditions } = setting;
      hideFields(hiddenFields);
      //
      const checkResult = conditions.map((condition) => {
        const { field, operator, value } = condition;
        let result = false;
        switch (operator) {
          case 'str_=':
            String(event.record[`${field.code}`].value) ===
              String(value.text) && (result = true);
            break;
          case 'str_!=':
            String(event.record[`${field.code}`].value) !==
              String(value.text) && (result = true);
            break;
          case 'str_includes':
            const temp1 = String(event.record[`${field.code}`].value) || '';
            temp1.includes(value.text) && (result = true);
            break;
          case 'str_!includes':
            const temp2 = String(event.record[`${field.code}`].value) || '';
            !temp2.includes(value.text) && (result = true);
            break;
          case 'num_=':
            Number(event.record[`${field.code}`].value) ===
              Number(value.number) && (result = true);
            break;
          case 'num_!=':
            Number(event.record[`${field.code}`].value) !==
              Number(value.number) && (result = true);
            break;
          case 'num_<=':
            Number(event.record[`${field.code}`].value) <=
              Number(value.number) && (result = true);
            break;
          case 'num_>=':
            Number(event.record[`${field.code}`].value) >=
              Number(value.number) && (result = true);
            break;
          case 'ary_includes':
            const temp3 = String(event.record[`${field.code}`].value) || [];
            const tempResults1 = value.array.map((value) =>
              temp3.includes(value)
            );
            tempResults1.includes(true) && (result = true);
            break;
          case 'ary_!includes':
            const temp4 = String(event.record[`${field.code}`].value) || [];
            const tempResults2 = value.array.map((value) =>
              temp4.includes(value)
            );
            !tempResults2.includes(true) && (result = true);
            break;
        }
        return result;
      });
      //
      if (
        (settingOperator === '&&' && !checkResult.includes(false)) ||
        (settingOperator === '||' && checkResult.includes(true))
      ) {
        showFields(hiddenFields);
      }
    });
  });
})(kintone.$PLUGIN_ID);
