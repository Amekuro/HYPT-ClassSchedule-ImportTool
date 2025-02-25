async function scheduleHtmlProvider() {
  await loadTool('AIScheduleTools')
  try {
    const year = await AISchedulePrompt({
      titleText: '学年',
      tipText: '请输入本学年开始的年份',
      defaultText: '2024',
      validator: value => {
        try {
          const v = parseInt(value)
          if (v < 2000 || v > 2100) {
            return '请输入正确的学年'
          }
          return false
        } catch (error) {
          return '请输入正确的学年'
        }
      }
    })

    const term = await AISchedulePrompt({
      titleText: '学期',
      tipText: '请输入本学期的学期(1,2分别表示上、下学期)',
      defaultText: '1',
      validator: value => {
        if (value === '1' || value === '2') {
          return false
        }
        return '请输入正确的学期'
      }
    })

    const xqm = {
      '1': '3',
      '2': '12',
    }[term]

    const res = await fetch("https://jw.hypt.edu.cn/kbcx/xskbcx_cxXsgrkb.html?gnmkdm=N2151", {
      "headers": {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-requested-with": "XMLHttpRequest"
      },
      "body": "xnm=2024&xqm=12&kzlx=ck&xsdm=",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    const ret = await res.json()
    return JSON.stringify(ret.kbList)

  } catch (error) {
    await AIScheduleAlert('请确定你已经登陆了教务系统')
    return 'do not continue'
  }
}
